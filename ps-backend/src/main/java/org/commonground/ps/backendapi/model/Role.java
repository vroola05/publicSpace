package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Role {
  private Long id;
  private String role;
  private boolean allow;
}
