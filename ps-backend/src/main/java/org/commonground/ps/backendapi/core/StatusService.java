package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.model.PageOverviewTemplate;

public interface StatusService {
  public List<StatusEntity> getStatus(Long domainId);
  public void convertPageOverviewStatusses(Long domainId, PageOverviewTemplate pageOverviewTemplate, PageOverviewEntity pageOverviewEntity) throws BadRequestException;
}
