package org.commonground.ps.backendapi.jpa.repositories;

import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {
  @Query("select c from CompanyEntity c where c.name = :#{#name}")
  Optional<CompanyEntity> getCompanyByName(@Param("name") String name);
}
