package org.commonground.ps.backendapi.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageOverviewTemplate {
  protected Long id;
  protected String name;
  protected String icon;
  protected String route;
  protected boolean toggle;
  protected boolean priority;
  protected boolean personal;
  protected Long size;
  
  private List<Status> statusses = new ArrayList<>();
  protected List<PageOverviewColumn> columns = new ArrayList<>();
  protected List<PageButton> buttonsLeft;
  protected List<PageButton> buttonsRight;

  public void setButtonsLeft(List<PageButton> pageButtons) {
    buttonsLeft = pageButtons;
  }

  public void setButtonsRight(List<PageButton> pageButtons) {
    buttonsRight = pageButtons;
  }
}
