package org.commonground.ps.backendapi.jpa.repositories;

import java.util.Date;
import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SessionRepository extends JpaRepository<SessionEntity, Long> {
  
  @Modifying
  @Transactional
  @Query("delete from SessionEntity s where s.dateModified < :#{#dateModified}")
  void deleteByDateModifiedLessThan(@Param("dateModified") Date dateModified);

  @Query("select s from SessionEntity s where s.dateModified > :#{#dateModified}")
  List<SessionEntity> findByDateModifiedGreaterThan(@Param("dateModified") Date dateModified);
}
