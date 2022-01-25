package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;

import org.commonground.ps.backendapi.model.CallList;
import org.commonground.ps.backendapi.model.OrderList;
import org.commonground.ps.backendapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderListRepository extends JpaSpecificationExecutor<OrderList>, JpaRepository<OrderList, Long> {
  
  @Query("select c from OrderList c where c.domainId = :#{#user.domain.id}")
  List<OrderList> getOrderList(@Param("user") User user);

  
  @Query("select c from OrderList c where c.status = :#{#status} and c.domainId = :#{#user.domain.id}")
  List<OrderList> getOrderListByStatusName(@Param("status") String status, @Param("user") User user);
}
