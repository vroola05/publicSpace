package org.commonground.ps.backendapi.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Location {
  private Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 250, message = "Waarde is minimaal 1 en maximaal 250 tekens")
  private String street;
  @PositiveOrZero(message = "Alleen nummers toegestaan")
  private String number;
  private String letter;
  private String postal;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 250, message = "Waarde is minimaal 1 en maximaal 250 tekens")
  private String city;
  private Integer area;
  @NotNull(message = "Waarde is verplicht")
  private Double x;
  @NotNull(message = "Waarde is verplicht")
  private Double y;

}
