package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.action.ActionFailedException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionQueueEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.jpa.repositories.ActionTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ActionServiceImpl implements ActionService {
	private final DomainRepository domainRepository;
	private final StatusRepository statusRepository;
	private final ActionTypeRepository actionTypeRepository;
	private final ActionRepository actionRepository;
	private final CallRepository callRepository;
	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final ActionQueueService actionQueueService;
	

	public ActionServiceImpl(
			ActionRepository actionRepository,
			ActionTypeRepository actionTypeRepository,
			CallRepository callRepository,
			DomainRepository domainRepository,
			OrderRepository orderRepository,
			UserRepository userRepository,
			StatusRepository statusRepository,
			ActionQueueService actionQueueService) {
		this.domainRepository = domainRepository;
		this.statusRepository = statusRepository;
		this.actionTypeRepository = actionTypeRepository;
		this.actionRepository = actionRepository;
		this.callRepository = callRepository;
		this.orderRepository = orderRepository;
		this.userRepository = userRepository;
		this.actionQueueService = actionQueueService;
		


	}

	@Override
	public Optional<Action> get(Long domainId, ActionEnum actionEnum) {
		Optional<ActionEntity> actionEntity = getActionEntityByDomainId(domainId, actionEnum);
		if (actionEntity.isPresent()) {
			return Optional.of(Convert.actionEntity(actionEntity.get()));
		}
		return Optional.empty();
	}

	@Override
	public List<ActionType> getActionTypes() {
		List<ActionType> actionTypes = new ArrayList<>();
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
		actionTypeEntities.forEach(actionTypeEntity -> 
			actionTypes.add(Convert.actionTypeEntity(actionTypeEntity))
		);
		return actionTypes;
	}

	@Override
	public List<Action> getActionsByDomainId(Long domainId) {
		List<Action> actions = new ArrayList<>();
		List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
		actionEntities.forEach(actionEntity -> 
			actions.add(Convert.actionEntity(actionEntity))
		);
		return actions;
	}

	@Override
	public Optional<ActionEntity> getActionEntityByDomainId(Long domainId, ActionEnum actionEnum) {
		return actionRepository.getActionByDomainIdAndActionTypeId(domainId, actionEnum.id);
	}

	public void synchronizeActions(Long companyId, Long domainId, User user) {
		Optional<DomainEntity> optionalDomainEntity = domainRepository.getDomainById(domainId, user);
		if (optionalDomainEntity.isPresent()) {
			DomainEntity domainEntity = optionalDomainEntity.get();
			List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
			List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.getActionTypeEntities(domainEntity.getDomainType().getId());
			
			List<ActionTypeEntity> actionTypeEntitiesNew = actionTypeEntities.stream().filter( actionTypeEntity -> 
				actionEntities.stream().noneMatch(b -> b.getActionType().getId().equals(actionTypeEntity.getId()))).collect(Collectors.toList());

			if (!actionTypeEntitiesNew.isEmpty()) {
				List<ActionEntity> newActionEntities = new ArrayList<>();
				actionTypeEntitiesNew.forEach(actionTypeEntity -> {
					ActionEntity actionEntity = new ActionEntity();
					actionEntity.setActionType(actionTypeEntity);
					actionEntity.setDomain(domainEntity);
					newActionEntities.add(actionEntity);
				});

				actionRepository.saveAll(newActionEntities);
			}

			List<ActionEntity> actionDelete = actionEntities.stream().filter( actionEntity -> 
				actionTypeEntities.stream().noneMatch(b -> b.getId().equals(actionEntity.getActionType().getId()))).collect(Collectors.toList());

			if (!actionDelete.isEmpty()) {
				actionRepository.deleteAll(actionDelete);
			}
		}
	}

	public Action updateAction(Long domainId, Action action) throws BadRequestException {
		Optional<ActionEntity> optionalActionEntity = actionRepository.getActionByDomainIdAndActionId(domainId,
				action.getId());
		if (optionalActionEntity.isPresent()) {
			ActionEntity actionEntity = optionalActionEntity.get();

			if (action.getStatus() != null) {
				Optional<StatusEntity> statusEntity = statusRepository.getStatusByDomainIdAndById(domainId,
						action.getStatus().getId());
				if (statusEntity.isPresent()) {
					actionEntity.setStatus(statusEntity.get());
				} else {
					actionEntity.setStatus(null);
				}
			} else {
				actionEntity.setStatus(null);
			}

			return Convert.actionEntity(actionRepository.save(actionEntity));
		}

		throw new BadRequestException();

	}

	public ActionTypeEntity getActionTypeEntity(long id) {
		Optional<ActionTypeEntity> actionTypeEntityOptional = actionTypeRepository.findById(id);
		return actionTypeEntityOptional.isEmpty() ? null : actionTypeEntityOptional.get();
	}

	@Override
	public void call(long domainId, User user, long callId, ActionEnum actionEnum) throws ActionFailedException {
		Optional<ActionEntity> actionEntityOptional = getActionEntityByDomainId(domainId, actionEnum);
		if (actionEntityOptional.isEmpty()) {
			return;
		}

		ActionEntity actionEntity = actionEntityOptional.get();
		
		Optional<CallEntity> callEntityOptional = callRepository.getCallById(callId, domainId);
		if (callEntityOptional.isEmpty()) {
			return;
		}
		
		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			return;
		}

		CallEntity callEntity = callEntityOptional.get();
		actionQueueService.setCallStatus(domainId, callEntity, actionEntityOptional.get());
		CallEntity result = callRepository.saveAndFlush(callEntity);

		execute(userEntityOptional.get(), result, actionEntity);
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
	public void order(long domainId, User user, OrderEntity orderEntity, ActionEnum actionEnum) throws ActionFailedException {
		
		Optional<ActionEntity> actionEntityOptional = getActionEntityByDomainId(domainId, actionEnum);
		if (actionEntityOptional.isEmpty()) {
			return;
		}

		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			return;
		}

		actionQueueService.setOrderStatus(domainId, orderEntity, actionEntityOptional.get());
		OrderEntity result = orderRepository.saveAndFlush(orderEntity);
		
		execute(userEntityOptional.get(), result, actionEntityOptional.get());
		orderEntity.setId(result.getId());
	}

	@Override
	public void execute(UserEntity userEntity, OrderEntity orderEntity, ActionEntity actionEntity) {
		ActionQueueEntity actionQueueEntity = new ActionQueueEntity();

		actionQueueEntity.setDateCreated(new Date());
		actionQueueEntity.setUser(userEntity);
		actionQueueEntity.setOrder(orderEntity);
		actionQueueEntity.setAction(actionEntity);
		
		actionQueueService.post(actionQueueEntity);
	}

	@Override
	public void execute(UserEntity userEntity, CallEntity callEntity, ActionEntity actionEntity) {
		ActionQueueEntity actionQueueEntity = new ActionQueueEntity();

		actionQueueEntity.setDateCreated(new Date());
		actionQueueEntity.setUser(userEntity);
		actionQueueEntity.setCall(callEntity);
		actionQueueEntity.setAction(actionEntity);
		
		actionQueueService.post(actionQueueEntity);
	}
}
