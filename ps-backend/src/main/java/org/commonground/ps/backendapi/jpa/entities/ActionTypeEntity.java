package org.commonground.ps.backendapi.jpa.entities;

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
  private String name;

  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="domain_type", referencedColumnName = "id")
  private DomainTypeEntity domainType;
}
