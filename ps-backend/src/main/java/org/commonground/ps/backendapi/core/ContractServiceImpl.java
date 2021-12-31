package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.Domain;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
	private DomainRepository domainRepository;

	@Autowired
	private ContractRepository contractRepository;
    
    @Override
    public List<Contract> getContracts(Long domainId) {
        List<Contract> contracts = new ArrayList<>();

		Optional<DomainEntity> domainEntityOptional = domainRepository.getDomainById(domainId);
		if (domainEntityOptional.isPresent()) {
			DomainEntity domainEntity = domainEntityOptional.get();
			if (domainEntity.getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
				contracts = getContractsGovernment(domainEntity.getId());
			} else if (domainEntity.getDomainType().getId() == DomainTypeEnum.CONTRACTOR.id) {
                contracts = getContractsContractor(domainEntity.getId());
			}
		}
        return contracts;
    }

    public List<Contract> getContractsGovernment(Long domainId) {
        List<Contract> contracts = new ArrayList<>();
        List<ContractEntity> contractEntities = contractRepository.getContractByGovernmentDomainId(domainId);
        for (ContractEntity contractEntity:  contractEntities) {
            Contract contract = Convert.contractEntity(contractEntity);
            contract.setDomain(Convert.domainEntity(contractEntity.getDomainContractor()));
            contracts.add(contract);
        }
        return contracts;
    }

    public List<Contract> getContractsContractor(Long domainId) {
        List<Contract> contracts = new ArrayList<>();
        List<ContractEntity> contractEntities = contractRepository.getContractByContractorDomainId(domainId);
        for (ContractEntity contractEntity:  contractEntities) {
            Contract contract = Convert.contractEntity(contractEntity);
            contract.setDomain(Convert.domainEntity(contractEntity.getDomainGovernment()));
            contracts.add(contract);
        }
        return contracts;
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
                return Convert.contractEntity(contractRepository.saveAndFlush(contractEntity));
            }
        }
        return null;
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
