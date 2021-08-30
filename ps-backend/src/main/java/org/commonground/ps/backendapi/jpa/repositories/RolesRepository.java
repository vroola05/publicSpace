package org.commonground.ps.backendapi.jpa.repositories;

import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<RolesEntity, Long> {
}
