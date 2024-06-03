package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StatusT implements Serializable {
  private Long id;
  private String type;
  private String name;
  private String path;
  private String action;
}
