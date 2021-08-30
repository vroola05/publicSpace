package org.commonground.ps.backendapi.exception.handler;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FieldValue {
  private String field;
  private String value;

  public FieldValue(String field, String value) {
    this.field = field;
    this.value = value;
  }
}
