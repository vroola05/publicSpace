package org.commonground.ps.backendapi.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageOverviewImpl implements Page {
  protected Long id;
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
