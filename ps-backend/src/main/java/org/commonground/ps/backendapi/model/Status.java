package org.commonground.ps.backendapi.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Status {
  private Long id;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  private String name;
}
