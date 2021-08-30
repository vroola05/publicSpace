package org.commonground.ps.backendapi.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Person {

  private Long id;
  
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 250, message = "Waarde is minimaal 1 en maximaal 250 tekens")
  private String name;

  @Email(message = "Geen geldig email adres")
  private String email;

  @PositiveOrZero(message = "Alleen nummers toegestaan")
  @Size(min = 1, max = 20, message = "Waarde is minimaal 1 en maximaal 20 tekens")
  private String phone;

  private String street;

  @PositiveOrZero(message = "Alleen nummers toegestaan")
  private String number;
  private String letter;
  private String postal;
  private String city;
}
