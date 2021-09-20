package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.commonground.ps.backendapi.model.PageButton;

public interface PageButtonRoleService {

  public List<RolesEntity> getRoles();
  public void convertPageButtonRoles(PageButton pageButton, PageButtonEntity pageButtonEntity) throws BadRequestException;
}
