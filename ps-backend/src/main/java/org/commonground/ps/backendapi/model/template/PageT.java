package org.commonground.ps.backendapi.model.template;

import java.util.ArrayList;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageT {
  private ArrayList<ButtonT> buttonsLeft;
  private ArrayList<ButtonT> buttonsRight;
}
