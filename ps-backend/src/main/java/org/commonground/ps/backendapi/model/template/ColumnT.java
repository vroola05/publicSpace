package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ColumnT {
  private String id;
  private String icon;
  private String name;
  private String notification;
  private String menuType;

  private String css;
  private String type;
  private String filter;
  private String mobile;
}
