package org.commonground.ps.backendapi.model;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageType implements Serializable {
  private Long id;
  private String name;
}
