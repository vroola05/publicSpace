package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageButtonCondition {
  private String field;
  private String operator;
  private String value;
}
