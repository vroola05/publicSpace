package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ComponentT implements Serializable {
  private List<DetailsHeaderT> detailsHeader;
  private HeaderT header;
  private HashMap<String, List<KeyValueT>> filter = new HashMap<>();
}
