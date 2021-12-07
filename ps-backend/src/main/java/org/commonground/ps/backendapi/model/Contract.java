package org.commonground.ps.backendapi.model;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Contract {
  private Long id;
  private Boolean accepted;
  private Date dateCreated;
  private Domain domain;
}
