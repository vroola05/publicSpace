package org.commonground.ps.backendapi.model;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Domain {
  private Long id;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  private String name;

  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  private String domain;

  private DomainType domainType;
  private Company company;
  private List<User> users;

  public Domain(Long id, String name, String domain, DomainType domainType) {
    this.id = id;
    this.name = name;
    this.domain = domain;
    this.domainType = domainType;
  }
}
