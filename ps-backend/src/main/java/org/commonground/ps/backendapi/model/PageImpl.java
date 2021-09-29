package org.commonground.ps.backendapi.model;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageImpl implements Page {
  @NotNull(message = "Waarde is verplicht")
  protected Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 10, message = "Waarde is minimaal 1 en maximaal 50 tekens")
  protected String name;
  protected PageType pageType;
  
  protected List<PageButton> buttonsLeft;
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
