package org.commonground.ps.backendapi.jpa.entities;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity

@Table(name = "domain_type")
public class DomainTypeEntity {
  @Id
  private Long id;
  private String name;
}
