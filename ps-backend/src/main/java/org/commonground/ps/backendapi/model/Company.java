package org.commonground.ps.backendapi.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;



import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Company {
  private Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  private String name;
  @NotNull(message = "Waarde is verplicht")
  private Long code;
  @NotNull(message = "Waarde is verplicht")
  private Integer srid;
  @NotNull(message = "Waarde is verplicht")
  private Double x;
  @NotNull(message = "Waarde is verplicht")
  private Double y;

}
