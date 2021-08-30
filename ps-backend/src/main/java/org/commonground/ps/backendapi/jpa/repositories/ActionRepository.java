package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActionRepository extends JpaRepository<ActionEntity, Long> {
  @Query("select a from ActionEntity a where a.domain.id = :#{#id} order by a.actionType.name asc")
  List<ActionEntity> getActionByDomainId(@Param("id") Long id);

  @Query("select a from ActionEntity a where a.domain.id = :#{#domainId} and a.id = :#{#actionId}")
  Optional<ActionEntity> getActionByDomainIdAndActionTypeId(@Param("domainId") Long domainId, @Param("actionId") Long actionId);
}
