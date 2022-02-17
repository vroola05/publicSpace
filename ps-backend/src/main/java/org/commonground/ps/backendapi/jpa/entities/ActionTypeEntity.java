package org.commonground.ps.backendapi.jpa.entities;

import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "action_type")
public class ActionTypeEntity {
  @Id
  private Long id;
  @OrderColumn
  private String name;

  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="domain_type", referencedColumnName = "id")
  private DomainTypeEntity domainType;

  @OneToMany(targetEntity = ActionEntity.class, mappedBy = "actionType")
  private List<ActionEntity> actions;
}
