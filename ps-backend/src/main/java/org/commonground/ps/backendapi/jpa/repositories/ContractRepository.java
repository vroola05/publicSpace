package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.ContractEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractRepository extends JpaRepository<ContractEntity, Long> {
  
  @Query("select c from ContractEntity c where c.domainGovernment.id = :#{#id}")
  List<ContractEntity> getContractByGovernmentDomainId(@Param("id") Long id);

  @Query("select c from ContractEntity c where c.domainGovernment.id = :#{#id} and  c.accepted = :#{#accepted}")
  List<ContractEntity> getContractByGovernmentDomainIdAccepted(@Param("id") Long id, @Param("accepted") Boolean accepted);

  @Query("select c from ContractEntity c where c.domainContractor.id = :#{#id}")
  List<ContractEntity> getContractByContractorDomainId(@Param("id") Long id);

  @Query("select c from ContractEntity c where c.domainContractor.id = :#{#id} and  c.accepted = true")
  List<ContractEntity> getContractByContractorDomainIdAccepted(@Param("id") Long id);
  
  @Query("select c from ContractEntity c where c.domainGovernment.id = :#{#domainIdGovernment} and c.domainContractor.id = :#{#domainIdContractor}")
  Optional<ContractEntity> getContractBy(@Param("domainIdGovernment") Long domainIdGovernment, @Param("domainIdContractor") Long domainIdContractor);

  @Query("select c from ContractEntity c where c.domainContractor.id = :#{#domainIdContractor} and c.id = :#{#contractId}")
  Optional<ContractEntity> getContractByContractorDomainIdAndId(@Param("domainIdContractor") Long domainIdContractor, @Param("contractId") Long contractId);

  @Query("select c from ContractEntity c where c.id = :#{#id}")
  Optional<ContractEntity> getContractById(@Param("id") Long id);
}
