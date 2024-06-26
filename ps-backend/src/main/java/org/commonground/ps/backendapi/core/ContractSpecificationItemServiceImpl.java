package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationItemEntity;
import org.commonground.ps.backendapi.jpa.repositories.ContractSpecificationItemsRepository;
import org.commonground.ps.backendapi.model.ContractSpecification;
import org.commonground.ps.backendapi.model.ContractSpecificationItem;
import org.springframework.stereotype.Service;

@Service
public class ContractSpecificationItemServiceImpl implements ContractSpecificationItemService {

	private final ContractSpecificationItemsRepository contractSpecificationItemsRepository;

    public ContractSpecificationItemServiceImpl(ContractSpecificationItemsRepository contractSpecificationItemsRepository) {
        this.contractSpecificationItemsRepository = contractSpecificationItemsRepository;
    }

    @Override
    public void convertContractSpecificationItems(ContractSpecification contractSpecification, ContractSpecificationEntity contractSpecificationEntity) throws BadRequestException {

        List<ContractSpecificationItem> contractSpecificationItems = contractSpecification.getContractSpecificationItems();
        List<ContractSpecificationItemEntity> contractSpecificationItemEntities = contractSpecificationEntity.getContractSpecificationItems();

        for (ContractSpecificationItem contractSpecificationItem : contractSpecificationItems) {
            Optional<ContractSpecificationItemEntity> contractSpecificationItemEntityOptional = contractSpecificationItemEntities.stream().filter(c -> c.getId().equals(contractSpecificationItem.getId())).findFirst();
            if (contractSpecificationItem.getId() != null && contractSpecificationItemEntityOptional.isPresent()) {
                ContractSpecificationItemEntity contractSpecificationItemEntity = contractSpecificationItemEntityOptional.get();
                contractSpecificationItemEntity.setSpecificationNumber(contractSpecificationItem.getSpecificationNumber());
                contractSpecificationItemEntity.setName(contractSpecificationItem.getName());
                contractSpecificationItemEntity.setPrice(contractSpecificationItem.getPrice());
                contractSpecificationItemEntity.setUnit(contractSpecificationItem.getUnit());
                contractSpecificationItemEntity.setActive(contractSpecificationItem.getActive());
            } else {
                ContractSpecificationItemEntity contractSpecificationItemEntity = new ContractSpecificationItemEntity();
                contractSpecificationItemEntity.setContractSpecification(contractSpecificationEntity);
                contractSpecificationItemEntity.setSpecificationNumber(contractSpecificationItem.getSpecificationNumber());
                contractSpecificationItemEntity.setName(contractSpecificationItem.getName());
                contractSpecificationItemEntity.setPrice(contractSpecificationItem.getPrice());
                contractSpecificationItemEntity.setUnit(contractSpecificationItem.getUnit());
                contractSpecificationItemEntity.setActive(contractSpecificationItem.getActive());
                contractSpecificationItemEntities.add(contractSpecificationItemEntity);
            }
        }

        // Remove
        contractSpecificationItemEntities
        .removeIf(contractSpecificationItemEntity -> 
            contractSpecificationItems.stream()
                .noneMatch(c -> c.getId().equals(contractSpecificationItemEntity.getId())));
    }

    @Override
    public List<ContractSpecificationItem> getContractSpecificationItems(Long domainIdGovernment,
            Long domainIdContractor) {
        List<ContractSpecificationItem> contractSpecificationItems = new ArrayList<>();

        List<ContractSpecificationItemEntity> contractSpecificationItemEntities = getContractSpecificationItemEntities(domainIdGovernment, domainIdContractor);
        for (ContractSpecificationItemEntity contractSpecificationItemEntity : contractSpecificationItemEntities) {
            contractSpecificationItems.add(Convert.contractSpecificationItemEntity(contractSpecificationItemEntity));
        }

        return contractSpecificationItems;
    }

    @Override
    public List<ContractSpecificationItemEntity> getContractSpecificationItemEntities(Long domainIdGovernment,
            Long domainIdContractor) {
        return contractSpecificationItemsRepository.getContractSpecificationItems(domainIdGovernment, domainIdContractor, new Date());
    }
}

