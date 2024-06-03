package org.commonground.ps.backendapi.model;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ActionType implements Serializable {
  private Long id;
  private String name;

  public ActionType(Long id, String name) {
    this.id = id;
    this.name = name;
  }
}
