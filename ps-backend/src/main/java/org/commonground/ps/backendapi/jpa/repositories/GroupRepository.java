package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GroupRepository extends JpaRepository<GroupEntity, Long> {

  @Query("select g from GroupEntity g where g.domain.id = :#{#domainId}")
  List<GroupEntity> getGroups(@Param("domainId") Long domainId);

  @Query("select g from GroupEntity g where g.id = :#{#id} and g.domain.id = :#{#domainId}")
  Optional<GroupEntity> getGroupById(@Param("id") Long id, @Param("domainId") Long domainId);

  @Query("select g from GroupEntity g where g.name = :#{#name} and g.domain.id = :#{#domainId}")
  Optional<GroupEntity> getGroupByName(@Param("name") String name, @Param("domainId") Long domainId);
}
