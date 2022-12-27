package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationItemEntity;
import org.commonground.ps.backendapi.model.ContractSpecification;
import org.commonground.ps.backendapi.model.ContractSpecificationItem;

public interface ContractSpecificationItemService {
    public void convertContractSpecificationItems(ContractSpecification contractSpecification, ContractSpecificationEntity contractSpecificationEntity) throws BadRequestException;
    public List<ContractSpecificationItem> getContractSpecificationItems(Long domainIdGovernment, Long domainIdContractor);
    public List<ContractSpecificationItemEntity> getContractSpecificationItemEntities(Long domainIdGovernment, Long domainIdContractor);
}
