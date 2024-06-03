package org.commonground.ps.backendapi.model;

import java.io.Serializable;
import java.util.List;

public interface Page extends Serializable {
    void setId(Long id);
    Long getId();

    void setName(String name);
    String getName();

    void setLayoutType(String layoutType);
    String getLayoutType();

    void setPageType(PageType pageType);
    PageType getPageType();

    List<PageButton> getButtonsLeft();
    void setButtonsLeft(List<PageButton> pageButtons);
    List<PageButton> getButtonsRight();
    void setButtonsRight(List<PageButton> pageButtons);
}
