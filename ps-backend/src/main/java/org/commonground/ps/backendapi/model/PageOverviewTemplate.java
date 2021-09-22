package org.commonground.ps.backendapi.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageOverviewTemplate {
  protected Long id;
  protected String name;
  protected String route;
  protected boolean toggle;
  protected boolean priority;

  protected List<PageButton> buttonsLeft;
  protected List<PageButton> buttonsRight;

  public void setButtonsLeft(List<PageButton> pageButtons) {
    buttonsLeft = pageButtons;
    
  }

  public void setButtonsRight(List<PageButton> pageButtons) {
    buttonsRight = pageButtons;
  }
}
