package org.commonground.ps.backendapi.jpa.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_user_id")
  @SequenceGenerator(name = "seq_user_id", sequenceName = "seq_user_id", allocationSize = 1)
  private Long id;
  private String username;
  private String password;
  private String name;
  private String email;
  private boolean admin;
  private String passwordSalt;
  private Long passwordIterationCount;
  private Long passwordKeyLength;
  private String passwordHashFunction;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
  name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private Set<RolesEntity> roles = new HashSet<>();

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
  name = "user_groups",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "group_id")
  )
  private Set<GroupEntity> groups = new HashSet<>();

  @ManyToOne(fetch = FetchType.EAGER)
  private DomainEntity domain;

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (object == null || getClass() != object.getClass()) {
      return false;
    }
    UserEntity o = (UserEntity) object;
    return id == o.id;
  }
}
