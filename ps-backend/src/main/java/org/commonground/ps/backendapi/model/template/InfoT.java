package org.commonground.ps.backendapi.model.template;

import java.io.Serializable;
import java.util.List;

import org.commonground.ps.backendapi.model.Status;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InfoT implements Serializable {
  private Long company;
  private Long domain;
  private String apikey;
  private String prefix;
  private String logo;
  private String favicon;
  private String favicon32;
  private String favicon512;
  private List<StatusT> statusses;
  private List<Status> status;
}
