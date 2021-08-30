package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ConditionT {
  private String field;
  private String operator;;
  private String value;
}
