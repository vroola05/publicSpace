package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderSpecificationItem {
  private Long id;
  private String amount;
  private ContractSpecificationItem contractSpecificationItem;
}
