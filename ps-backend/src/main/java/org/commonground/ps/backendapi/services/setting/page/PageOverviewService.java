package org.commonground.ps.backendapi.services.setting.page;

import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.model.Page;

public interface PageOverviewService {

  public void updatePageOverviewPages(Long domainId, Page page, PageEntity pageEntity);
}
