package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.UUID;

import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.commonground.ps.backendapi.model.enums.ActionQueueState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActionQueueRepository extends JpaRepository<ActionQueueEntity, UUID> {
    List<ActionQueueEntity> findAllByActionQueueStateNot(ActionQueueState actionQueueState);

    @Modifying
    @Query("delete from ActionQueueEntity a where a.order.id = :#{#id}")
    int deleteActionQueueByOrderEntity(@Param("id") Long id);

}
