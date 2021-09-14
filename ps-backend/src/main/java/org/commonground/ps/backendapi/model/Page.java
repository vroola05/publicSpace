package org.commonground.ps.backendapi.model;

import java.util.List;

public interface Page {
    void setId(Long id);
    Long getId();

    void setName(String name);
    String getName();

    void setPageType(PageType pageType);
    PageType getPageType();

    void setButtonsLeft(List<PageButton> pageButtons);
    void setButtonsRight(List<PageButton> pageButtons);
}
