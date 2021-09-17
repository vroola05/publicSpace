package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.model.Page;

public interface PageService {
  public List<Page> get(Long companyId, Long domainId);
  public Page updatePage(Long domainId, Long pageId,  Page page);
  
}
