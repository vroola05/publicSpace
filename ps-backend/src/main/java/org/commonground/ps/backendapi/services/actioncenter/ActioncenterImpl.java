package org.commonground.ps.backendapi.services.actioncenter;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.commonground.ps.backendapi.exception.action.ActionFailedException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionQueueRepository;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;
import org.commonground.ps.backendapi.model.enums.ActionQueueState;
import org.springframework.stereotype.Service;

@Service
public class ActioncenterImpl implements Actioncenter {
private final CallRepository callRepository;
	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final ActionQueue actionQueue;
    private final ActioncenterQueueExecutor actioncenterQueueExecutor;
	private final ActionQueueRepository actionQueueRepository;
    private final ActionRepository actionRepository;

    public ActioncenterImpl(
            ActionRepository actionRepository,
			CallRepository callRepository,
			OrderRepository orderRepository,
			UserRepository userRepository,
			ActionQueue actionQueue,
			ActionQueueRepository actionQueueRepository,
            ActioncenterQueueExecutor actioncenterQueueExecutor
    ) {
        this.callRepository = callRepository;
		this.orderRepository = orderRepository;
		this.userRepository = userRepository;
		this.actionQueue = actionQueue;
        this.actionRepository = actionRepository;
		this.actionQueueRepository = actionQueueRepository;
        this.actioncenterQueueExecutor = actioncenterQueueExecutor;
    }

	public Optional<ActionEntity> getActionEntityByDomainId(Long domainId, ActionEnum actionEnum) {
		return actionRepository.getActionByDomainIdAndActionTypeId(domainId, actionEnum.id);
	}

    @Override
	public void call(long domainId, User user, long callId, ActionEnum actionEnum) throws ActionFailedException {
		Optional<CallEntity> callEntityOptional = callRepository.getCallById(callId, domainId);
		if (callEntityOptional.isEmpty()) {
			return;
		}
		call(domainId, user, callEntityOptional.get(), actionEnum);
	}

	public CallEntity call(long domainId, User user, CallEntity callEntity, ActionEnum actionEnum) throws ActionFailedException {
		Optional<ActionEntity> actionEntityOptional = getActionEntityByDomainId(domainId, actionEnum);
		if (actionEntityOptional.isEmpty()) {
			return null;
		}

		ActionEntity actionEntity = actionEntityOptional.get();
		
		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			return null;
		}

		actioncenterQueueExecutor.setCallStatus(domainId, callEntity, actionEntityOptional.get());
		CallEntity result = callRepository.saveAndFlush(callEntity);

		execute(userEntityOptional.get(), result, actionEntity);

		return result;
	}

	@Override
	public void order(long domainId, User user, long orderId, ActionEnum actionEnum) throws ActionFailedException {
		Optional<OrderEntity> orderEntityOptional = orderRepository.getOrderById(orderId, domainId);
		if (orderEntityOptional.isEmpty()) {
			return;
		}

		order(domainId, user, orderEntityOptional.get(), actionEnum);
	}

	@Override
	public OrderEntity order(long domainId, User user, OrderEntity orderEntity, ActionEnum actionEnum) throws ActionFailedException {
		
		Optional<ActionEntity> actionEntityOptional = getActionEntityByDomainId(domainId, actionEnum);
		if (actionEntityOptional.isEmpty()) {
			return null;
		}

		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			return null;
		}

		actioncenterQueueExecutor.setOrderStatus(domainId, orderEntity, actionEntityOptional.get());
		OrderEntity result = orderRepository.saveAndFlush(orderEntity);
		
		execute(userEntityOptional.get(), result, actionEntityOptional.get());

		return result;
	}

	@Override
	public void execute(UserEntity userEntity, OrderEntity orderEntity, ActionEntity actionEntity) {
		ActionQueueEntity actionQueueEntity = new ActionQueueEntity();

		actionQueueEntity.setId(UUID.randomUUID());
		actionQueueEntity.setDateCreated(new Date());
		actionQueueEntity.setUser(userEntity);
		actionQueueEntity.setOrder(orderEntity);
		actionQueueEntity.setCall(orderEntity.getCall());
		actionQueueEntity.setAction(actionEntity);
		actionQueueEntity.setState(ActionQueueState.START);

		actionQueueRepository.saveAndFlush(actionQueueEntity);
		actionQueue.post(actionQueueEntity.getId());
	}

	@Override
	public void execute(UserEntity userEntity, CallEntity callEntity, ActionEntity actionEntity) {
		ActionQueueEntity actionQueueEntity = new ActionQueueEntity();

		actionQueueEntity.setId(UUID.randomUUID());
		actionQueueEntity.setDateCreated(new Date());
		actionQueueEntity.setUser(userEntity);
		actionQueueEntity.setCall(callEntity);
		actionQueueEntity.setAction(actionEntity);
        actionQueueEntity.setState(ActionQueueState.START);

        actionQueueRepository.saveAndFlush(actionQueueEntity);
		actionQueue.post(actionQueueEntity.getId());
	}
}
