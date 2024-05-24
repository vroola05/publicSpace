package org.commonground.ps.backendapi.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageButtonCondition {
  private Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 500, message = "Waarde is minimaal 1 en maximaal 500 tekens")
  private String field;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 10, message = "Waarde is minimaal 1 en maximaal 10 tekens")
  private String operator;
  @Size(min = 0, max = 1000, message = "Waarde is minimaal 0 en maximaal 1000 tekens")
  private String value;
}
