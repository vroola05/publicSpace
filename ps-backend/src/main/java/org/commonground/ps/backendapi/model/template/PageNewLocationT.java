package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class PageNewLocationT extends PageT {
  private ListTemplateT listTemplate;
}
