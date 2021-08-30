package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "groups")
public class GroupEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_group_id")
  @SequenceGenerator(name = "seq_group_id", sequenceName = "seq_group_id", allocationSize = 1)
  private Long id;
  private String name;

  @ManyToOne(fetch = FetchType.EAGER)
  private DomainEntity domain;
}
