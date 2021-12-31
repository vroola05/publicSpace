package org.commonground.ps.backendapi.core;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.model.PageButton;

public interface PageButtonConditionService {
  public void convertPageButtonConditions(PageButton pageButton, PageButtonEntity pageButtonEntity) throws BadRequestException;
}
