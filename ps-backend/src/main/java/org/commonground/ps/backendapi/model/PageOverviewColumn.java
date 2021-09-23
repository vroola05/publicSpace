package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageOverviewColumn {
  private Long id;
  private String name;
  private String title;
  private String type;
  private String filter;
  private String css;
  private String mobile;
}
