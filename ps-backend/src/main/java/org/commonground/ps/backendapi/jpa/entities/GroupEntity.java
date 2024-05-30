package org.commonground.ps.backendapi.jpa.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

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

  
  @ManyToOne(fetch = FetchType.LAZY)
  private DomainEntity domain;
}
