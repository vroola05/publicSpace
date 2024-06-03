package org.commonground.ps.backendapi.model;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class UserSession implements Serializable {
  private static final long serialVersionUID = 1L;

  private Long id;
  
  private String referer;
  private Date dateCreated;
  private Date dateModified;
  private User user;
}
