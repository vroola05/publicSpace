package org.commonground.ps.backendapi.model.template;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
public class EndpointT implements Serializable {
  private String endpoint;
  private List<String> roles;
}
