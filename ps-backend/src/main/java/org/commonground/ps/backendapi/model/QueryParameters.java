package org.commonground.ps.backendapi.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QueryParameters {
  private String search;
  private int offset;
  private int size;
  private List<QueryParametersFieldFilter> filters;
}
