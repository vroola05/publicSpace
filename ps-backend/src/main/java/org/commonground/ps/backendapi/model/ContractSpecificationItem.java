package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ContractSpecificationItem {
  private Long id;
  private String specificationNumber;
  private String name;
  private String unit;
  private String price;
  private Boolean active;
}
