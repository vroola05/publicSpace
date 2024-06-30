package org.commonground.ps.backendapi.jpa.repositories;

import java.util.UUID;

import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionQueueRepository extends JpaRepository<ActionQueueEntity, UUID> {
}
