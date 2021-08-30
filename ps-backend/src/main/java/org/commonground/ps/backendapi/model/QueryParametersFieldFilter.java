package org.commonground.ps.backendapi.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QueryParametersFieldFilter {
  private String field;
  private QueryParametersFieldFilterOperator operator;
  private QueryParametersFieldFilterType type;

  private QueryParametersFilterValue value;
  private List<QueryParametersFilterValue> list;
  private QueryParametersFilterValue from;
  private QueryParametersFilterValue to;

  public QueryParametersFieldFilter(String field, QueryParametersFieldFilterType type, List<QueryParametersFilterValue> list) {
    this.field = field;
    this.type = type;
    this.operator = QueryParametersFieldFilterOperator.IN;
    this.list  = list;
  }

  public QueryParametersFieldFilter(String field, QueryParametersFieldFilterType type, QueryParametersFieldFilterOperator operator, QueryParametersFilterValue value) {
    this.field = field;
    this.type = type;
    this.operator = operator;
    this.value = value;
  }

  public QueryParametersFieldFilter(String field, QueryParametersFieldFilterType type, QueryParametersFilterValue from, QueryParametersFilterValue to) {
    this.field = field;
    this.type = type;
    this.operator = QueryParametersFieldFilterOperator.BETWEEN;
    this.from = from;
    this.to = to;
  }
}
