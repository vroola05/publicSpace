package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractRepository extends JpaSpecificationExecutor<ContractEntity>, JpaRepository<ContractEntity, Long> {
  
  @Query("select c from ContractEntity c where c.domainGovernment.id = :#{#id}")
  List<ContractEntity> getContractByGovernmentDomainId(@Param("id") Long id);
}
