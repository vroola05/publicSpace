package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StatusRepository extends JpaRepository<StatusEntity, Long> {

  @Query("select s from StatusEntity s where s.id = :#{#id} and s.domain.id = :#{#user.domain.id}")
  Optional<StatusEntity> getStatusById(@Param("id") Long id, @Param("user") User user);
  
  @Query("select s from StatusEntity s where s.domain.id = :#{#domainId} and s.id = :#{#id}")
  Optional<StatusEntity> getStatusByDomainIdAndById(@Param("domainId") Long domainId, @Param("id") Long id);

  @Query("select s from StatusEntity s where s.domain.id = :#{#id}")
  List<StatusEntity> getStatusByDomainId(@Param("id") Long id);
}
