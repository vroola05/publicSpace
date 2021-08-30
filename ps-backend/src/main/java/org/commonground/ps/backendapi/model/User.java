package org.commonground.ps.backendapi.model;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class User {
  private Long id;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 4, max = 20, message = "Waarde is minimaal 4 en maximaal 20 tekens")
  private String username;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 50, message = "Waarde is minimaal 1 en maximaal 50 tekens")
  private String name;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 4, max = 150, message = "Waarde is minimaal 4 en maximaal 150 tekens")
  @Email(message = "Geen geldig email")
  private String email;
  private boolean admin;
  
  private String apikey;

  private List<String> roles = new ArrayList<>();

  private List<Group> groups = new ArrayList<>();

  private Domain domain;
  private Company company;
}
