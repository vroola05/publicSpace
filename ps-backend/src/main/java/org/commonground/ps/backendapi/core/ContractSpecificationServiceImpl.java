package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationItemEntity;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.ContractSpecificationsRepository;
import org.commonground.ps.backendapi.model.ContractSpecification;
import org.commonground.ps.backendapi.model.ContractSpecificationItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractSpecificationServiceImpl implements ContractSpecificationService {
    @Autowired
	private ContractRepository contractRepository;

    @Autowired
	private ContractSpecificationsRepository contractSpecificationsRepository;
    
    @Autowired
	private ContractSpecificationItemService contractSpecificationItemService;

    @Override
    public List<ContractSpecification> getContractSpecifications(Long domainId, Long contractId) {
        List<ContractSpecification> contractSpecifications = new ArrayList<ContractSpecification>();
        List<ContractSpecificationEntity> contractSpecificationEntities = contractSpecificationsRepository.getContractSpecificationByContractId(domainId, contractId);

        for(ContractSpecificationEntity contractSpecificationEntity: contractSpecificationEntities) {
            ContractSpecification contractSpecification = Convert.contractSpecificationEntity(contractSpecificationEntity);

            List<ContractSpecificationItem> contractSpecificationItems = new ArrayList<ContractSpecificationItem>();
            for(ContractSpecificationItemEntity contractSpecificationItemEntity: contractSpecificationEntity.getContractSpecificationItems()) {
                contractSpecificationItems.add(Convert.contractSpecificationItemEntity(contractSpecificationItemEntity));
            }
            contractSpecification.setContractSpecificationItems(contractSpecificationItems);

            contractSpecifications.add(contractSpecification);
        }

        return contractSpecifications;
    }


    @Override
    public ContractSpecification saveContractSpecification(Long domainId, Long contractId,
            ContractSpecification contractSpecification) {

        Optional<ContractEntity> contractEntityOptional = contractRepository.getContractByContractorDomainIdAndId(domainId, contractId);

        if (contractEntityOptional.isPresent()) {

            ContractSpecificationEntity contractSpecificationEntity = new ContractSpecificationEntity();
            contractSpecificationEntity.setActive(contractSpecification.getActive());
            contractSpecificationEntity.setDateCreated(new Date());
            contractSpecificationEntity.setDescription(contractSpecification.getDescription());
            contractSpecificationEntity.setDateStart(contractSpecification.getDateStart());
            contractSpecificationEntity.setDateEnd(contractSpecification.getDateEnd());
            contractSpecificationEntity.setContract(contractEntityOptional.get());

            contractSpecificationItemService.convertContractSpecificationItems(contractSpecification, contractSpecificationEntity);

            ContractSpecification contractSpecificationResult = Convert.contractSpecificationEntity(contractSpecificationsRepository.save(contractSpecificationEntity));
            return contractSpecificationResult;
        }

        return null;
    }


    @Override
    public ContractSpecification updateContractSpecification(Long domainId, Long contractId,
            Long contractSpecificationId, ContractSpecification contractSpecification) {
        Optional<ContractSpecificationEntity> contractSpecificationEntityOptional = contractSpecificationsRepository.getContractSpecificationById(domainId, contractId, contractSpecificationId);
        if (contractSpecificationEntityOptional.isPresent()) {
            ContractSpecificationEntity contractSpecificationEntity = contractSpecificationEntityOptional.get();
            contractSpecificationEntity.setActive(contractSpecification.getActive());
            contractSpecificationEntity.setDateStart(contractSpecification.getDateStart());
            contractSpecificationEntity.setDateEnd(contractSpecification.getDateEnd());
            contractSpecificationEntity.setDescription(contractSpecification.getDescription());

            contractSpecificationItemService.convertContractSpecificationItems(contractSpecification, contractSpecificationEntity);

            ContractSpecification contractSpecificationResult = Convert.contractSpecificationEntity(contractSpecificationsRepository.saveAndFlush(contractSpecificationEntity));
            return contractSpecificationResult;
        }
        return null;
    }
}

