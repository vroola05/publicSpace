package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "status")
public class StatusEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_status_id")
  @SequenceGenerator(name = "seq_status_id", sequenceName = "seq_status_id", allocationSize = 1)
  private Long id;
  private String name;

  @ManyToOne(fetch = FetchType.EAGER)
  private DomainEntity domain;
}
