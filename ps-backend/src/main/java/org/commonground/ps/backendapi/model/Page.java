package org.commonground.ps.backendapi.model;

import java.util.List;

import org.commonground.ps.backendapi.model.template.EndpointT;

public interface Page {
    void setId(Long id);
    Long getId();

    void setName(String name);
    String getName();

    void setLayoutType(String layoutType);
    String getLayoutType();

    void setPageType(PageType pageType);
    PageType getPageType();

    void setPageComponents(List<PageComponents> pageComponents);
    List<PageComponents> getPageComponents();

    void setPageEndpoints(List<EndpointT> endpoints);
    List<EndpointT> getPageEndpoints();

    List<PageButton> getButtonsLeft();
    void setButtonsLeft(List<PageButton> pageButtons);
    List<PageButton> getButtonsRight();
    void setButtonsRight(List<PageButton> pageButtons);
}
