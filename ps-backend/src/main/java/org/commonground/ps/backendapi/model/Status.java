package org.commonground.ps.backendapi.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Status {
  private Long id;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 50, message = "Waarde is minimaal 1 en maximaal 50 tekens")
  private String name;

  private List<ActionType> actionTypes = new ArrayList<>();
}
