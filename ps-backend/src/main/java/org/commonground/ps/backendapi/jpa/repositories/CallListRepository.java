package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;

import org.commonground.ps.backendapi.model.CallList;
import org.commonground.ps.backendapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CallListRepository extends JpaSpecificationExecutor<CallList>, JpaRepository<CallList, Long> {//}, QueryByExampleExecutor<CallList> {
  
  @Query("select c from CallList c where c.domainId = :#{#user.domain.id}")
  List<CallList> getCallList(@Param("user") User user);

  
  @Query("select c from CallList c where c.status = :#{#status} and c.domainId = :#{#user.domain.id}")
  List<CallList> getCallListByStatusName(@Param("status") String status, @Param("user") User user);
}
