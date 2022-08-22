package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractSpecificationsRepository extends JpaRepository<ContractSpecificationEntity, Long> {
  
  @Query("select c from ContractSpecificationEntity c where c.contract.domainContractor.id = :#{#domainId} and c.contract.id = :#{#contractId} order by c.description asc, c.dateStart asc")
  List<ContractSpecificationEntity> getContractSpecificationByContractId(@Param("domainId") Long domainId, @Param("contractId") Long contractId);

  @Query("select c from ContractSpecificationEntity c where c.contract.domainContractor.id = :#{#domainId} and c.contract.id = :#{#contractId} and c.id = :#{#id}")
  Optional<ContractSpecificationEntity> getContractSpecificationById(@Param("domainId") Long domainId, @Param("contractId") Long contractId, @Param("id") Long id);
}
