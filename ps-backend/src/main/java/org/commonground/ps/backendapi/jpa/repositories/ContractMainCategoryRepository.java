package org.commonground.ps.backendapi.jpa.repositories;

import org.commonground.ps.backendapi.jpa.entities.ContractMainCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractMainCategoryEntityId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractMainCategoryRepository extends JpaRepository<ContractMainCategoryEntity, ContractMainCategoryEntityId> {
}
