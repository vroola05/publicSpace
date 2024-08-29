package org.commonground.ps.backendapi.model;

import java.util.List;

import org.commonground.ps.backendapi.model.template.EndpointT;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageImpl implements Page {
  @NotNull(message = "Waarde is verplicht")
  protected Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  protected String name;
  protected PageType pageType;
  @Size(min = 1, max = 100, message = "Waarde is minimaal 1 en maximaal 100 tekens")
  protected String layoutType;
  
  @Valid
  protected List<PageButton> buttonsLeft;
  @Valid
  protected List<PageButton> buttonsRight;
  
  protected List<PageComponents> pageComponents;
  protected List<EndpointT> endpoints;

  @Override
  public void setButtonsLeft(List<PageButton> pageButtons) {
    buttonsLeft = pageButtons;
    
  }
  @Override
  public void setButtonsRight(List<PageButton> pageButtons) {
    buttonsRight = pageButtons;
  }
  @Override
  public void setPageComponents(List<PageComponents> pageComponents) {
    this.pageComponents = pageComponents;
  }
  @Override
  public List<PageComponents> getPageComponents() {
    return pageComponents;
  }
  @Override
  public void setPageEndpoints(List<EndpointT> endpoints) {
    this.endpoints = endpoints;
  }
  @Override
  public List<EndpointT> getPageEndpoints() {
    return endpoints;
  }
}
