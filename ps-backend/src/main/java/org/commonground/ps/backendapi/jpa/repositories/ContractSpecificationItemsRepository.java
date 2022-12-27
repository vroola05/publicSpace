package org.commonground.ps.backendapi.jpa.repositories;

import java.util.Date;
import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractSpecificationItemsRepository extends JpaRepository<ContractSpecificationItemEntity, Long> {
  
  @Query("select c from ContractSpecificationItemEntity c where c.contractSpecification.contract.domainGovernment.id = :#{#domainIdGovernment} and c.contractSpecification.contract.domainContractor.id = :#{#domainIdContractor} and c.active = true and c.contractSpecification.active = true and c.contractSpecification.dateStart <= :#{#date} and (c.contractSpecification.dateEnd is null or c.contractSpecification.dateEnd >= :#{#date}) order by c.specificationNumber asc, c.name asc")
  List<ContractSpecificationItemEntity> getContractSpecificationItems(@Param("domainIdGovernment") Long domainIdGovernment, @Param("domainIdContractor") Long domainIdContractor, @Param("date") Date date);

  @Query("select c from ContractSpecificationItemEntity c where c.contractSpecification.contract.domainGovernment.id = :#{#domainIdGovernment} and c.contractSpecification.contract.domainContractor.id = :#{#domainIdContractor} and c.active = true and c.contractSpecification.active = true and c.contractSpecification.dateStart <= :#{#date} and (c.contractSpecification.dateEnd is null or c.contractSpecification.dateEnd >= :#{#date}) order by c.specificationNumber asc, c.name asc")
  List<ContractSpecificationItemEntity> getContractSpecificationItemsByOrderId(@Param("domainIdGovernment") Long domainIdGovernment, @Param("domainIdContractor") Long domainIdContractor, @Param("date") Date date);
}
