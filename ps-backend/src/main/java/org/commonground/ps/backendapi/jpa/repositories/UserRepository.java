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

  @Query(value = "select u.* from users u, user_groups ug, groups g where u.domain_id = :#{#domainId} and u.id = ug.user_id and ug.group_id = :#{#groupId}", nativeQuery = true)
  List<UserEntity> getUserByGroupId(@Param("domainId") Long domainId, @Param("groupId") Long groupId);

  @Query("select u from UserEntity u where u.name = :#{#name}")
  Optional<UserEntity> getUserByName(@Param("name") String name);

  @Query("select u from UserEntity u where u.username = :#{#username}")
  Optional<UserEntity> getUserByUsername(@Param("username") String username);

  @Query("select u from UserEntity u where u.domain.id = :#{#domainId} and u.username = :#{#username}")
  Optional<UserEntity> getUserByUsername(@Param("domainId") Long domainId, @Param("username") String username);

  @Query("select u from UserEntity u where u.domain.id = :#{#domainId} and u.id = :#{#userId}")
  Optional<UserEntity> getUserById(@Param("domainId") Long domainId, @Param("userId") Long userId);
}
