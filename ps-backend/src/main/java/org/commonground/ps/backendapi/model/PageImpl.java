package org.commonground.ps.backendapi.model;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageImpl implements Page {
  @NotNull(message = "Waarde is verplicht")
  protected Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  protected String name;
  protected PageType pageType;
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  protected String layoutType;
  
  @Valid
  protected List<PageButton> buttonsLeft;
  @Valid
  protected List<PageButton> buttonsRight;
  

  @Override
  public void setButtonsLeft(List<PageButton> pageButtons) {
    buttonsLeft = pageButtons;
    
  }
  @Override
  public void setButtonsRight(List<PageButton> pageButtons) {
    buttonsRight = pageButtons;
  }
}
