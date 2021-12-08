package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.MainCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MainCategoryRepository extends JpaRepository<MainCategoryEntity, Long> {
  
  @Query("select m from MainCategoryEntity m where m.id = :#{#id} and m.domain.id = :#{#domainId}")
  Optional<MainCategoryEntity> getMainCategoryById(@Param("id") Long id, @Param("domainId") Long domainId);

  @Query("select m from MainCategoryEntity m where m.domain.id = :#{#domainId} order by m.name asc")
  List<MainCategoryEntity> getMainCategories(@Param("domainId") Long domainId);

  @Query("select m from MainCategoryEntity m where m.name = :#{#name} and m.domain.id = :#{#domainId}")
  Optional<MainCategoryEntity> getMainCategoryByName(@Param("name") String name, @Param("domainId") Long domainId);

  @Query("select m from MainCategoryEntity m where m.id = :#{#id} and m.domain.id = :#{#domainId}")
  Optional<MainCategoryEntity> getMainCategoryByContractId(@Param("id") Long id, @Param("domainId") Long domainId);
}
