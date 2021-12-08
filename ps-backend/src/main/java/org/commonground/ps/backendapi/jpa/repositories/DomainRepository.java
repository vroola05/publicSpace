package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DomainRepository extends JpaRepository<DomainEntity, Long> {

  @Query("select d from DomainEntity d where d.id = :#{#id}")
  Optional<DomainEntity> getDomainById(@Param("id") Long id);

  @Query("select d from DomainEntity d where d.id = :#{#id} and d.company.id = :#{#user.company.id}")
  Optional<DomainEntity> getDomainById(@Param("id") Long id, @Param("user") User user);

  @Query("select d from DomainEntity d where d.name = :#{#name}")
  Optional<DomainEntity>  getDomainByName(@Param("name") String name);

  @Query("select d from DomainEntity d where d.domain = :#{#domain}")
  Optional<DomainEntity>  getDomainByDomain(@Param("domain") String domain);
  
  @Query("select d from DomainEntity d where d.company.id = :#{#id}")
  List<DomainEntity> getDomainsByComapnyId(@Param("id") Long id);

  @Query("select d from DomainEntity d where d.company.id = :#{#id}")
  List<DomainEntity> getDomains(@Param("id") Long id);

  @Query("select d from DomainEntity d where lower(d.domain) like :#{#domain}%")
  List<DomainEntity> getDomainsByStartsWithDomain(@Param("domain") String domain);
}
