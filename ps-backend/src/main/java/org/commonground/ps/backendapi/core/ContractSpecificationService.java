package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.model.ContractSpecification;

public interface ContractSpecificationService {
    public List<ContractSpecification> getContractSpecifications(Long domainId, Long contractId);
    public ContractSpecification saveContractSpecification(Long domainId, Long contractId, ContractSpecification contractSpecification);
    public ContractSpecification updateContractSpecification(Long domainId, Long contractId, Long contractSpecificationId, ContractSpecification contractSpecification);
}
