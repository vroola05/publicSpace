package org.commonground.ps.backendapi.model;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageButton {
  private Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  private String name;
  @Size(max = 512, message = "Waarde is minimaal 1 en maximaal 512 tekens")
  private String route;
  private ActionType action;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  private String type;
  @Valid
  private List<Role> roles;
  @Valid
  private List<PageButtonCondition> conditions;

  @JsonIgnore
  private PageOverviewTemplate pageOverview;
}
