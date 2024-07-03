package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.exception.action.ActionFailedException;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;

public interface ActionService {
  public Optional<Action> get(Long domainId, ActionEnum actionEnum);
  public ActionTypeEntity getActionTypeEntity(long id);
  public List<ActionType> getActionTypes();
  public List<Action> getActionsByDomainId(Long domainId);
  public Optional<ActionEntity> getActionEntityByDomainId(Long domainId, ActionEnum actionEnum);
  public void synchronizeActions(Long companyId, Long domainId, User user);
  public Action updateAction(Long domainId, Action action) throws BadRequestException;
  

  public void call(long domainId, User user, long callId, ActionEnum action) throws ActionFailedException;
  public void order(long domainId, User user, long orderId, ActionEnum action) throws ActionFailedException;
  public void order(long domainId, User user, OrderEntity orderEntity, ActionEnum actionEnum) throws ActionFailedException;

  public void execute(UserEntity userEntity, OrderEntity orderEntity, ActionEntity actionEntity);
  public void execute(UserEntity userEntity, CallEntity callEntity, ActionEntity actionEntity);
}
