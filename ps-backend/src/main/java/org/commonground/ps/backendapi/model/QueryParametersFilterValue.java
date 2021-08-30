package org.commonground.ps.backendapi.model;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QueryParametersFilterValue {
  
  private String text;
  private Date date;
  private Long number;

  public QueryParametersFilterValue(String text) {
    this.text = text;
  }

  public QueryParametersFilterValue(Long number) {
    this.number = number;
  }

  public QueryParametersFilterValue(Date date) {
    this.date = date;
  }
}
