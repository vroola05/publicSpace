package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class KeyValueT implements Serializable {
  private Long key;
  private String value; 
}
