package org.commonground.ps.backendapi.model;

import java.util.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Category {
  private Long id;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 80, message = "Waarde is minimaal 1 en maximaal 80 tekens")
  private String name;

  @NotNull(message = "Waarde is verplicht")
  private Date startDate;
  private Date endDate;
  private Boolean active;

  private Group group;
}
