package org.commonground.ps.backendapi.model;

import java.util.ArrayList;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Page {
  private Long id;
  private String name;
  private ArrayList<PageButton> buttonsLeft;
  private ArrayList<PageButton> buttonsRight;
  private PageType pageType;
}
