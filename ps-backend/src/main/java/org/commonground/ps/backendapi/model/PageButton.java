package org.commonground.ps.backendapi.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageButton {
  private Long id;
  private String name;
  private String route;
  private ActionType action;
  private String type;
  private List<Role> roles;
  private List<PageButtonCondition> conditions;
}
