package org.commonground.ps.backendapi.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageOverviewTemplate {
  protected Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  protected String name;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 80, message = "Waarde is minimaal 1 en maximaal 80 tekens")
  protected String icon;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 1000, message = "Waarde is minimaal 1 en maximaal 1000 tekens")
  protected String route;
  protected boolean toggle;
  protected boolean priority;
  protected boolean personal;
  @NotNull(message = "Waarde is verplicht")
  @Max(value = 250, message = "Waarde is maximaal 250")
  protected Long size;
  
  @Valid
  private List<Status> statusses = new ArrayList<>();
  @Valid
  protected List<PageOverviewColumn> columns = new ArrayList<>();
  @Valid
  protected List<PageButton> buttonsLeft;
  @Valid
  protected List<PageButton> buttonsRight;

  public void setButtonsLeft(List<PageButton> pageButtons) {
    buttonsLeft = pageButtons;
  }

  public void setButtonsRight(List<PageButton> pageButtons) {
    buttonsRight = pageButtons;
  }
}
