package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActionTypeRepository extends JpaRepository<ActionTypeEntity, Long> {
    @Query("select a from ActionTypeEntity a where a.domainType.id is null or a.domainType.id = :#{#domainTypeId}")
    List<ActionTypeEntity> getActionTypeEntities(@Param("domainTypeId") Long domainTypeId);

    
}
