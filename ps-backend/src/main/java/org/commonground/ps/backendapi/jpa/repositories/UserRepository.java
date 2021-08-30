package org.commonground.ps.backendapi.jpa.repositories;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

  @Query("select u from UserEntity u where u.domain.id = :#{#domainId}")
  List<UserEntity> getUsers(@Param("domainId") Long domainId);

  @Query("select u from UserEntity u where u.name = :#{#name}")
  Optional<UserEntity> getUserByName(@Param("name") String name);

  @Query("select u from UserEntity u where u.username = :#{#username}")
  Optional<UserEntity> getUserByUsername(@Param("username") String username);
}
