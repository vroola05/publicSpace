package org.commonground.ps.backendapi.model;

import java.io.Serializable;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Group implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private Long id;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  private String name;

  public Group(Long id, String name) {
    this.id = id;
    this.name = name;
  }
}
