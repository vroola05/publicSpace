package org.commonground.ps.backendapi.services.actioncenter;

import java.util.UUID;

import org.commonground.ps.backendapi.exception.action.ActionFailedException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;

public interface ActioncenterQueueExecutor {
    public void setOrderStatus(long domainId, OrderEntity orderEntity, ActionEntity actionEntity) throws ActionFailedException;
    public void setCallStatus(long domainId, CallEntity callEntity, ActionEntity actionEntity) throws ActionFailedException;
    public void executeProcess (UUID id);
}
