package org.commonground.ps.backendapi.model.template;

import java.util.HashMap;
import java.util.Map;

import org.commonground.ps.backendapi.model.Page;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DomainT {
  private InfoT info;
  private HashMap<String, EndpointT> endpoints = new HashMap<>();
  private ComponentT components;
  private PagesT pagesOld;
  private Map<String, Page> pages = new HashMap<>();
  
}
