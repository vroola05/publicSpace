package org.commonground.ps.backendapi.model.template;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ButtonT {
  private String name;
  private String route;
  private String action;
  private String type;
  private List<RoleT> roles;
  private List<ConditionT> conditions;
}
