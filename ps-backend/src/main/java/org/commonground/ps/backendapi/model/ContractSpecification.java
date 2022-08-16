package org.commonground.ps.backendapi.model;

import java.util.Date;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ContractSpecification {
  private Long id;
  private String description;
  private Date dateCreated;
  private Date dateStart;
  private Date dateEnd;
  private Boolean active;

  private List<ContractSpecificationItem> contractSpecificationItems;
}
