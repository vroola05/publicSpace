package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HeaderGroupT implements Serializable {
  private String route;
  private String api;
}
