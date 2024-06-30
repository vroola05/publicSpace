package org.commonground.ps.backendapi.core;

import org.commonground.ps.backendapi.exception.ActionQueueFailedException;
import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionQueueRepository;
import org.commonground.ps.backendapi.model.enums.ActionEnum;
import org.commonground.ps.backendapi.model.enums.ActionQueueState;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ActionQueueServiceImpl implements ActionQueueService {

    private final ActionQueueRepository actionQueueRepository;

    public ActionQueueServiceImpl(ActionQueueRepository actionQueueRepository) {
        this.actionQueueRepository = actionQueueRepository;

    }

    @Override
    @Async
    public void execute(ActionQueueEntity actionQueueEntity) {
        try {
            executeAllOrdersClosed(actionQueueEntity);
        } catch (ActionQueueFailedException e) {
            // TODO - Implement logger
        } finally {
            actionQueueRepository.saveAndFlush(actionQueueEntity);
        }
    }

    private void executeAllOrdersClosed(ActionQueueEntity actionQueueEntity) throws ActionQueueFailedException {
        actionQueueEntity.setState(ActionQueueState.ALL_ORDERS_CLOSED);
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
}
