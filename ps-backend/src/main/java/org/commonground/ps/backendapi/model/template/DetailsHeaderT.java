package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DetailsHeaderT {
  private String id;
  private String name;
  private String type;
  private String css;
}
