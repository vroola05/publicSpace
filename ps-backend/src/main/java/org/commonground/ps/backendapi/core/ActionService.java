package org.commonground.ps.backendapi.core;

import java.util.List;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.util.ActionEnum;

public interface ActionService {
  public Action get(Long domainId, ActionEnum actionEnum);
  public ActionTypeEntity getActionTypeEntity(long id);
  public List<ActionType> getActionTypes();
  public List<Action> getActionByDomainId(Long domainId);
  public void synchronizeActions(Long companyId, Long domainId, User user);
  public Action updateAction(Long domainId, Action action) throws BadRequestException;
  public boolean call(long domainId, long callId, ActionEnum action);
}
