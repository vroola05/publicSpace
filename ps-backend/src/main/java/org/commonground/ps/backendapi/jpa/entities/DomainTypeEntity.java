package org.commonground.ps.backendapi.jpa.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
