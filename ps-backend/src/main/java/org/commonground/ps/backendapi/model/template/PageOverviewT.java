package org.commonground.ps.backendapi.model.template;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageOverviewT {
  private int listSize;
  private List<ListTemplateT> listTemplate;
}
