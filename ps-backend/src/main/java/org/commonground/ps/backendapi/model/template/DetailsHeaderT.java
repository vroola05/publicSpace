package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DetailsHeaderT implements Serializable {
  private String id;
  private String name;
  private String type;
  private String css;
}
