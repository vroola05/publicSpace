package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.model.PageButton;

public interface PageButtonService {

  public void updatePageButtons(String location, PageEntity pageEntity,
			List<PageButton> pageButtons);
}
