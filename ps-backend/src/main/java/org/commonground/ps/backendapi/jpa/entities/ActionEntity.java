package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "action")
public class ActionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_action_id")
  @SequenceGenerator(name = "seq_action_id", sequenceName = "seq_action_id", allocationSize = 1)
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER)
  private ActionTypeEntity actionType;

  @ManyToOne(fetch = FetchType.EAGER)
  private DomainEntity domain;

  @ManyToOne(fetch = FetchType.EAGER)
  private StatusEntity status;
}
