package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoleT {
  private String role;
  private boolean allow;
}
