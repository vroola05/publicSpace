package org.commonground.ps.backendapi.services.actioncenter;

import org.commonground.ps.backendapi.exception.action.ActionFailedException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;

public interface Actioncenter {
    public void call(long domainId, User user, long callId, ActionEnum action) throws ActionFailedException;
    public CallEntity call(long domainId, User user, CallEntity callEntity, ActionEnum actionEnum) throws ActionFailedException;
    public void order(long domainId, User user, long orderId, ActionEnum action) throws ActionFailedException;
    public OrderEntity order(long domainId, User user, OrderEntity orderEntity, ActionEnum actionEnum) throws ActionFailedException;

    public void execute(UserEntity userEntity, OrderEntity orderEntity, ActionEntity actionEntity);
    public void execute(UserEntity userEntity, CallEntity callEntity, ActionEntity actionEntity);
}
