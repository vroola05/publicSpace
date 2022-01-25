package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
  @Query("select o from OrderEntity o where o.call.id = :#{#callId} and o.domain.id = :#{#domainId}")
  List<OrderEntity> getOrders(@Param("callId") Long callId, @Param("domainId") Long domainId);

  // @Query("select o from OrderEntity o where o.call.id = :#{#callId} and o.id = :#{#id}")
  // Optional<OrderEntity> getOrderById(@Param("callId") Long callId, @Param("id") Long id, @Param("domainId") Long domainId);

}
