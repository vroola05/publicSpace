package org.commonground.ps.backendapi.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MainCategory {
  private Long id;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 80, message = "Waarde is minimaal 1 en maximaal 80 tekens")
  private String name;

  private Category category;

  public MainCategory(Long id, String name) {
    this.id = id;
    this.name = name;
  }
}
