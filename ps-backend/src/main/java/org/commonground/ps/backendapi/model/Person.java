package org.commonground.ps.backendapi.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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

  @Pattern(regexp = "^([0-9]*)", message = "Alleen nummers toegestaan")
  @Size(min = 0, max = 20, message = "Waarde is minimaal 1 en maximaal 20 tekens")
  private String phone;

  private String street;
  @Pattern(regexp = "^([0-9]*)", message = "Alleen nummers toegestaan")
  @Size(min = 0, max = 6, message = "Waarde is minimaal 0 en maximaal 6 tekens")
  private String number;
  @Pattern(regexp = "^([a-z]*)", message = "Alleen nummers toegestaan")
  @Size(min = 0, max = 2, message = "Waarde is minimaal 0 en maximaal 2 tekens")
  private String letter;
  private String postal;
  private String city;
}
