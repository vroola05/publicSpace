package org.commonground.ps.backendapi.core;

import org.commonground.ps.backendapi.exception.action.ActionFailedException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;

public interface ActionQueueService {
    public void post(ActionQueueEntity actionQueueEntity);
    public void consume();
    public void consume(ActionQueueEntity actionQueueEntity);
    public void setCallStatus(long domainId, CallEntity callEntity, ActionEntity actionEntity) throws ActionFailedException;
    public void setOrderStatus(long domainId, OrderEntity orderEntity, ActionEntity actionEntity) throws ActionFailedException;
}
