package org.commonground.ps.backendapi.core;

import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.util.ActionEnum;

public interface ActionService {
  public Action get(Long domainId, ActionEnum actionEnum);
}
