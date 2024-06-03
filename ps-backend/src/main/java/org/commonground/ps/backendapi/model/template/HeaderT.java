package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HeaderT implements Serializable {
  private List<HeaderMenuItemT> headerMenu;
  private HeaderGroupT group;
}
