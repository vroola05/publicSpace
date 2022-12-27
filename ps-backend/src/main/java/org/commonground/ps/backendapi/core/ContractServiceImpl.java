package org.commonground.ps.backendapi.core;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractMainCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.MainCategoryEntity;
import org.commonground.ps.backendapi.jpa.repositories.ContractMainCategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.MainCategoryRepository;
import org.commonground.ps.backendapi.model.Category;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.Domain;
import org.commonground.ps.backendapi.model.MainCategory;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
	private DomainRepository domainRepository;

	@Autowired
	private ContractRepository contractRepository;
    
    @Autowired
    private MainCategoryRepository mainCategoryRepository;

    @Autowired
    private ContractMainCategoryRepository contractMainCategoryRepository;

    @Override
    public List<Contract> getContracts(Long domainId) {
        return getContracts(domainId, null);
    }

    @Override
    public List<Contract> getContracts(Long domainId, Boolean accepted) {
        List<Contract> contracts = new ArrayList<>();

		Optional<DomainEntity> domainEntityOptional = domainRepository.getDomainById(domainId);
		if (domainEntityOptional.isPresent()) {
			DomainEntity domainEntity = domainEntityOptional.get();
			if (domainEntity.getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
				contracts = getContractsGovernment(domainEntity.getId(), accepted);
			} else if (domainEntity.getDomainType().getId() == DomainTypeEnum.CONTRACTOR.id) {
                contracts = getContractsContractor(domainEntity.getId(), accepted);
			}
		}

        return contracts;
    }

    public List<Contract> getContractsGovernment(Long domainId, Boolean accepted) {
        List<Contract> contracts = new ArrayList<>();
        List<ContractEntity> contractEntities;
        if (accepted == null) {
            contractEntities = contractRepository.getContractByGovernmentDomainId(domainId);
        } else {
            contractEntities = contractRepository.getContractByGovernmentDomainIdAccepted(domainId, accepted);
        }

        for (ContractEntity contractEntity:  contractEntities) {
            contracts.add(convertContract(contractEntity, contractEntity.getDomainContractor(), false));
        }
        return contracts;
    }

    public List<Contract> getContractsContractor(Long domainId, Boolean active) {
        List<Contract> contracts = new ArrayList<>();
        List<ContractEntity> contractEntities = contractRepository.getContractByContractorDomainId(domainId);
        for (ContractEntity contractEntity:  contractEntities) {
            contracts.add(convertContract(contractEntity, contractEntity.getDomainGovernment(), false));
        }
        return contracts;
    }

    @Override
    public Contract getContract(Long domainId, Long id) {
        Optional<ContractEntity> contractEntityOptional = contractRepository.getContractById(id);
        Optional<DomainEntity> domainEntityOptional = domainRepository.getDomainById(domainId);
		if (domainEntityOptional.isPresent() && contractEntityOptional.isPresent()) {
			DomainEntity domainEntity = domainEntityOptional.get();
            ContractEntity contractEntity = contractEntityOptional.get();
			if (domainEntity.getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
                if (contractEntity.getDomainGovernment().getId() == domainId) {
                    return convertContract(contractEntity, contractEntity.getDomainContractor(), true);
                }
			} else if (domainEntity.getDomainType().getId() == DomainTypeEnum.CONTRACTOR.id) {
                if (contractEntity.getDomainContractor().getId() == domainId) {
                    return convertContract(contractEntity, contractEntity.getDomainGovernment(), true);
                }
			}
		}

        return null;
    }

    private Contract convertContract(ContractEntity contractEntity, DomainEntity domainEntity, boolean complete) {
        Contract contract = Convert.contractEntity(contractEntity);
        contract.setDomain(Convert.domainEntity(domainEntity));
        DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

        try {
            Date now = formatter.parse(formatter.format(new Date()));
            if (complete) {
                List<MainCategory> mainCategories = new ArrayList<>();
                if( contractEntity.getContractMainCategories() != null) {
                    for( ContractMainCategoryEntity contractMainCategoryEntity: contractEntity.getContractMainCategories()) {
                        MainCategory mainCategory = Convert.mainCategoryEntity(contractMainCategoryEntity.getMainCategory());
                        mainCategories.add(mainCategory);
                        List<Category> categories = new ArrayList<>();
                        if( contractMainCategoryEntity.getMainCategory().getCategories() != null) {
                            for(CategoryEntity categoryEntity: contractMainCategoryEntity.getMainCategory().getCategories()) {
                                if (categoryEntity.getActive() 
                                    && (categoryEntity.getStartDate() == null || now.equals(categoryEntity.getStartDate()) || now.after(categoryEntity.getStartDate()))
                                    && (categoryEntity.getEndDate() == null || now.equals(categoryEntity.getEndDate()) || now.before(categoryEntity.getEndDate())) ) {
                                    categories.add(Convert.categoryEntity(categoryEntity));
                                }
                            }
                        }
                        mainCategory.setCategories(categories);
                    }
                }
    
                contract.setMainCategories(mainCategories);
            }
        } catch (ParseException e) {}
        return contract;
    }

    @Override
    public Contract save(Long domainId, Contract contract) {
        Optional<DomainEntity> domainEntityOptional = domainRepository.getDomainById(domainId);
		if (domainEntityOptional.isPresent()) {
            Domain domainContractor = contract.getDomain();

            Optional<DomainEntity> domainContractorEntityOptional = domainRepository.getDomainById(domainContractor.getId());
            if (domainContractorEntityOptional.isPresent()) {
                ContractEntity contractEntity = new ContractEntity();
                contractEntity.setAccepted(false);
                contractEntity.setDateCreated(new Date());
                contractEntity.setDomainGovernment(domainEntityOptional.get());
                contractEntity.setDomainContractor(domainContractorEntityOptional.get());
                
                Contract contractResult = Convert.contractEntity(contractRepository.save(contractEntity));
                contractResult.setDomain(Convert.domainEntity(contractEntity.getDomainContractor()));
                return contractResult;
            }
        }

        return null;
    }

    @Override
    public Optional<Contract> getContractBy(Long domainIdGovernment, Long domainIdContractor) {
        Optional<ContractEntity> contractEntityOptional = contractRepository.getContractBy(domainIdGovernment, domainIdContractor);
        if (contractEntityOptional.isPresent()) {
            return Optional.ofNullable(Convert.contractEntity(contractEntityOptional.get()));
        }
        return Optional.empty();
    }

    @Override
    public Contract update(Long domainIdContractor, Long id, Contract contract) {
        Optional<ContractEntity> contractEntityOptional = contractRepository.getContractById(id);
        if (contractEntityOptional.isPresent()) {
            ContractEntity contractEntity = contractEntityOptional.get();
            if (contractEntity.getDomainContractor().getId() == domainIdContractor) {
                contractEntity.setAccepted(contract.getAccepted());

                updateContractMainCategories(contract.getMainCategories(), contractEntity);

                contractRepository.saveAndFlush(contractEntity);
                removeContractMainCategories(contract.getMainCategories(), contractEntity.getContractMainCategories());
            }

            return contract;
        }
        return null;
    }

    private void removeContractMainCategories(List<MainCategory> mainCategories, List<ContractMainCategoryEntity> contractMainCategoryEntities) throws BadRequestException {
        contractMainCategoryRepository.deleteAll(contractMainCategoryEntities.stream()
            .filter(mce -> mainCategories.stream().noneMatch(mc -> mce.getMainCategory().getId() == mc.getId()))
                .collect(Collectors.toList()));
        
    }

    private void updateContractMainCategories(List<MainCategory> mainCategories, ContractEntity contractEntity) throws BadRequestException {
        List<MainCategoryEntity> mainCategoryEntities = mainCategoryRepository.getMainCategories(contractEntity.getDomainContractor().getId());
        for (MainCategory mainCategory : mainCategories) {
            if (contractEntity.getContractMainCategories().stream().noneMatch(cmc -> cmc.getMainCategory().getId() == mainCategory.getId())) {
                // // Insert
                Optional<MainCategoryEntity> mainCategoryEntityOptional = mainCategoryEntities.stream().filter(r -> r.getId() == mainCategory.getId()).findFirst();
                if (mainCategoryEntityOptional.isPresent()) {
                    contractEntity.addMainCategory(mainCategoryEntityOptional.get());
                } else {
                    throw new BadRequestException();
                }
            }
        }
    }


    @Override
    public boolean delete(Long domainIdGovernment, Long id) {
        Optional<ContractEntity> contractEntityOptional = contractRepository.getContractById(id);
        if (contractEntityOptional.isPresent()) {
            ContractEntity contractEntity = contractEntityOptional.get();
            if (contractEntity.getDomainGovernment().getId() == domainIdGovernment) {
                contractRepository.delete(contractEntityOptional.get());
                return true;
            }
        }
        return false;
    }
}
