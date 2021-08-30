package org.commonground.ps.backendapi.model.template;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FilterT {
  private List<KeyValueT> areas;
  private List<KeyValueT> statuses;
}
