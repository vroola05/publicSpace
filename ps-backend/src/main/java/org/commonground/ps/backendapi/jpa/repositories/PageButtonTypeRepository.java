package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.PageButtonTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageButtonTypeRepository extends JpaRepository<PageButtonTypeEntity, Long> {
  public List<PageButtonTypeEntity> findAllByOrderByNameAsc();
}
