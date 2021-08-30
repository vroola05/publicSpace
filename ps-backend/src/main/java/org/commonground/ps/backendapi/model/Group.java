package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Group {
  private Long id;
  private String name;

  public Group(Long id, String name) {
    this.id = id;
    this.name = name;
  }
}
