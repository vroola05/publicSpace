package org.commonground.ps.backendapi.model.template;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ListTemplateT {
  private String id;
  private boolean toggle;
  private String route;
  private String priority;
  private String notification;
  private List<ButtonT> buttonsLeft;
  private List<ButtonT> buttonsRight;
  private List<ColumnT> columns;
}
