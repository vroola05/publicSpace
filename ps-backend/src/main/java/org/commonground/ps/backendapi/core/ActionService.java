package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;

public interface ActionService {
  public Optional<Action> get(Long domainId, ActionEnum actionEnum);
  public Optional<ActionEntity> getEntity(Long domainId, ActionEnum actionEnum);
  public ActionTypeEntity getActionTypeEntity(long id);
  public List<ActionType> getActionTypes();
  public List<Action> getActionByDomainId(Long domainId);
  public void synchronizeActions(Long companyId, Long domainId, User user);
  public Action updateAction(Long domainId, Action action) throws BadRequestException;
  public boolean call(long domainId, long callId, ActionEnum action);
  public boolean order(long domainId, long orderId, ActionEnum action);
  public boolean order(long domainId, OrderEntity orderEntity, ActionEnum actionEnum);
}
