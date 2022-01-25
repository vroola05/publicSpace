package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.model.Contract;

public interface ContractService {
    public List<Contract> getContracts(Long domainId);
    public List<Contract> getContracts(Long domainId, Boolean active);
    public Contract getContract(Long domainId, Long id);
    public Optional<Contract> getContractBy(Long domainIdGovernment, Long domainIdContractor);
    public Contract save(Long domainId, Contract contract);
    public Contract update(Long domainIdContractor, Long id, Contract contract);
    public boolean delete(Long domainIdGovernment, Long id);
}
