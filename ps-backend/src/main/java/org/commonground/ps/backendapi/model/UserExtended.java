package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class UserExtended extends User {

  private String password;
  private String rePassword;

}
