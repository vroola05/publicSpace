package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DomainType {
  private Long id;
  private String name;

  public DomainType(Long id, String name) {
    this.id = id;
    this.name = name;
  }
}
