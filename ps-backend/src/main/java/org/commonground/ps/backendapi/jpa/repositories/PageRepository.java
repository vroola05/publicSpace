package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PageRepository extends JpaRepository<PageEntity, Long> {

  @Query("select p from PageEntity p where p.domain.id = :#{#domainId}")
  List<PageEntity> getPages(@Param("domainId") Long domainId);

  @Query("select p from GroupEntity p where p.id = :#{#id} and p.domain.id = :#{#domainId}")
  Optional<PageEntity> getPageById(@Param("id") Long id, @Param("domainId") Long domainId);
}
