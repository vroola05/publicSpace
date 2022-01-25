package org.commonground.ps.backendapi.jpa.repositories;

import java.math.BigDecimal;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CallRepository extends JpaRepository<CallEntity, Long> {
  @Query("select c from CallEntity c where c.id = :#{#id} and c.domain.id = :#{#domainId}")
  Optional<CallEntity> getCallById(@Param("id") Long id, @Param("domainId") Long domainId);

  @Query(value = "SELECT nextval('public.seq_casenumber_id')", nativeQuery = true)
  public BigDecimal getNextCasenumber();
}
