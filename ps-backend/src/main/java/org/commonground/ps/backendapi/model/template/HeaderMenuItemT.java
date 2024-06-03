package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HeaderMenuItemT implements Serializable {
  private String id;

  private String name;
  private String route;
  private String action;
  private String type;
  private String icon;

  private String api;
  private String notification;
  private String menuType;
}
