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

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "action_type_id", referencedColumnName = "id")
  private ActionTypeEntity actionType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "domain_id", referencedColumnName = "id")
  private DomainEntity domain;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "status_id", referencedColumnName = "id")
  private StatusEntity status;

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (object == null || getClass() != object.getClass()) {
      return false;
    }
    ActionEntity o = (ActionEntity) object;
    return id == o.id;
  }
}
