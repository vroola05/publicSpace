package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ActionType {
  private Long id;
  private String name;
  private Boolean visible;

  public ActionType(Long id, String name, Boolean visible) {
    this.id = id;
    this.name = name;
    this.visible = visible;
  }
}
