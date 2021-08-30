package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StatusT {
  private Long id;
  private String type;
  private String name;
  private String path;
  private String action;
}
