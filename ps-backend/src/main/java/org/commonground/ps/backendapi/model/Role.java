package org.commonground.ps.backendapi.model;

import java.io.Serializable;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Role implements Serializable {
  @NotNull(message = "Waarde is verplicht")
  private Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 50, message = "Waarde is minimaal 1 en maximaal 50 tekens")
  private String role;
  private boolean allow;
}
