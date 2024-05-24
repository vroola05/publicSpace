package org.commonground.ps.backendapi.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Login {
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 4, max = 8, message = "Waarde is minimaal 4 en maximaal 20 tekens")
  private String username;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 8, message = "Waarde is minimaal 8 tekens")
  private String password;
}
