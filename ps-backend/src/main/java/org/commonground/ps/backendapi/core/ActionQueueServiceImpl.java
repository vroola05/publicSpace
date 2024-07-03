package org.commonground.ps.backendapi.core;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

import org.commonground.ps.backendapi.exception.action.ActionFailedException;
import org.commonground.ps.backendapi.exception.action.ActionQueueFailedException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionQueueRepository;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.model.enums.ActionEnum;
import org.commonground.ps.backendapi.model.enums.ActionQueueState;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.springframework.stereotype.Service;

@Service
public class ActionQueueServiceImpl implements ActionQueueService, Runnable {
    private final ActionQueueRepository actionQueueRepository;
    private final ActionRepository actionRepository;

    private AtomicBoolean running = new AtomicBoolean(false);

    public ActionQueueServiceImpl(
            ActionQueueRepository actionQueueRepository,
            ActionRepository actionRepository) {
        this.actionQueueRepository = actionQueueRepository;
        this.actionRepository = actionRepository;
    }

    @Override
    public void setCallStatus(long domainId, CallEntity callEntity, ActionEntity actionEntity)
            throws ActionFailedException {
        StatusEntity statusEntity = actionEntity.getStatus();
        if (statusEntity != null && statusEntity.getId() != null) {
            callEntity.setStatus(statusEntity);
        }

        if (callEntity.getStatus() == null) {
            ActionFailedException actionFailedException = new ActionFailedException(
                    "No status for a call of: " + callEntity.getDomain().getName());
            actionFailedException.addError(new FieldValue("status", "There is no status defined for the action."));
            throw actionFailedException;

        }

        ActionTypeEntity actionTypeEntity = actionEntity.getActionType();
        if (actionTypeEntity.getDomainType() != null
                && actionTypeEntity.getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
            // TODO - create call-actiontypeentity
            // callEntity.setActionTypeEntity(actionTypeEntity);
        }
    }

    @Override
    public void setOrderStatus(long domainId, OrderEntity orderEntity, ActionEntity actionEntity)
            throws ActionFailedException {
        // Check e
        StatusEntity statusEntity = actionEntity.getStatus();
        if (statusEntity != null && statusEntity.getId() != null) {
            orderEntity.setStatus(statusEntity);
        }

        if (orderEntity.getStatus() == null) {
            ActionFailedException actionFailedException = new ActionFailedException(
                    "No status for an order for contractor: " + orderEntity.getDomain().getName());
            actionFailedException.addError(new FieldValue("status", "There is no status defined for the action."));
            throw actionFailedException;
        }

        ActionTypeEntity actionTypeEntity = actionEntity.getActionType();
        if (actionTypeEntity.getDomainType() != null
                && actionTypeEntity.getDomainType().getId() == DomainTypeEnum.CONTRACTOR.id) {
            orderEntity.setActionTypeEntity(actionTypeEntity);
        }
    }

    @Override
    public void post(ActionQueueEntity actionQueueEntity) {
        if (actionQueueEntity.getState() == null) {
            actionQueueEntity.setState(ActionQueueState.START);
            actionQueueRepository.saveAndFlush(actionQueueEntity);
        }

        this.run();
    }

    @Override
    public void consume() {
        List<ActionQueueEntity> actionQueueEntities = actionQueueRepository.findAllByActionQueueStateNot(ActionQueueState.END);
        for (ActionQueueEntity actionQueueEntity : actionQueueEntities) {
            consume(actionQueueEntity);
        }
    }

    @Override
    public void consume(ActionQueueEntity actionQueueEntity) {
        try {
            executeAllOrdersClosed(actionQueueEntity);
            executeEmailCaller(actionQueueEntity);
            executeEmailSupervisor(actionQueueEntity);
            executeEmailContractor(actionQueueEntity);
            actionQueueEntity.setState(ActionQueueState.END);
        } catch (ActionQueueFailedException e) {
            // TODO - Implement logger
        } finally {
            actionQueueRepository.saveAndFlush(actionQueueEntity);
        }
    }

    private void executeAllOrdersClosed(ActionQueueEntity actionQueueEntity) throws ActionQueueFailedException {
        if (actionQueueEntity.getState().compareTo(ActionQueueState.ALL_ORDERS_CLOSED) >= 0) {
            return;
        }

        if (actionQueueEntity.getOrder() == null || actionQueueEntity.getOrder().getCall() == null) {
            return;
        }

        CallEntity callEntity = actionQueueEntity.getOrder().getCall();
        boolean areOpenOrders = false;
        for (OrderEntity orderEntity : callEntity.getOrders()) {
            if (!isOrderClosed(orderEntity.getActionTypeEntity())) {
                areOpenOrders = true;
                break;
            }
        }

        if (!areOpenOrders) {
            Optional<ActionEntity> actionEntitCallyOptional = actionRepository.getActionByDomainIdAndActionTypeId(
                    callEntity.getDomain().getId(), ActionEnum.CALL_ALL_ORDERS_CLOSED.id);
            ;
            if (actionEntitCallyOptional.isPresent()) {
                setCallStatus(callEntity.getDomain().getId(), callEntity, actionEntitCallyOptional.get());
                ActionQueueEntity actionQueueEntityCall = new ActionQueueEntity();

                actionQueueEntityCall.setDateCreated(new Date());
                actionQueueEntityCall.setUser(actionQueueEntity.getUser());
                actionQueueEntityCall.setCall(actionQueueEntity.getCall());
                actionQueueEntityCall.setAction(actionEntitCallyOptional.get());

                post(actionQueueEntity);
            }
        }

        actionQueueEntity.setState(ActionQueueState.ALL_ORDERS_CLOSED);
    }

    private void executeEmailCaller(ActionQueueEntity actionQueueEntity) throws ActionQueueFailedException {
        if (actionQueueEntity.getState().compareTo(ActionQueueState.EMAIL_CALLER) >= 0) {
            return;
        }
        actionQueueEntity.setState(ActionQueueState.EMAIL_CALLER);
    }

    private void executeEmailSupervisor(ActionQueueEntity actionQueueEntity) throws ActionQueueFailedException {
        if (actionQueueEntity.getState().compareTo(ActionQueueState.EMAIL_SUPERVISOR) >= 0) {
            return;
        }
        actionQueueEntity.setState(ActionQueueState.EMAIL_SUPERVISOR);
    }

    private void executeEmailContractor(ActionQueueEntity actionQueueEntity) throws ActionQueueFailedException {
        if (actionQueueEntity.getState().compareTo(ActionQueueState.EMAIL_CONTRACTOR) >= 0) {
            return;
        }
        actionQueueEntity.setState(ActionQueueState.EMAIL_CONTRACTOR);
    }

    public boolean isOrderClosed(ActionTypeEntity actionTypeEntity) {
        ActionEnum actionEnum = ActionEnum.valueOfId(actionTypeEntity.getId());
        return actionEnum.equals(ActionEnum.ORDER_CANCEL)
                || actionEnum.equals(ActionEnum.ORDER_DONE_REJECT)
                || actionEnum.equals(ActionEnum.ORDER_CLOSE);
    }

    public boolean areAllOrdersClosed(CallEntity callEntity) {
        return callEntity.getOrders().stream()
                .allMatch(orderEntity -> isOrderClosed(orderEntity.getActionTypeEntity()));
    }

    /**
     * This causes problems when running a multitennant environment
     */
    @Override
    public void run() {
        if (running.getAndSet(true)) {
            try {
                this.consume();
            } finally {
                running.set(false);
            }
        }
    }
}
