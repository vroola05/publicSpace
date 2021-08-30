package org.commonground.ps.backendapi.jpa.repositories;

import org.commonground.ps.backendapi.jpa.entities.DomainTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainTypeRepository extends JpaRepository<DomainTypeEntity, Long> {
}
