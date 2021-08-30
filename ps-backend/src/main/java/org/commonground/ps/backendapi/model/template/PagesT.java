package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PagesT {
  private PageOverviewT overview;
  private PageNewLocationT newLocation;
  private PageT newInformation;
  private PageT newConfirmation;

}
