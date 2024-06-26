package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.jpa.repositories.ActionTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
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

	public ActionServiceImpl(
			ActionRepository actionRepository,
			ActionTypeRepository actionTypeRepository,
			CallRepository callRepository,
			DomainRepository domainRepository,
			OrderRepository orderRepository,
			StatusRepository statusRepository) {
		this.domainRepository = domainRepository;
		this.statusRepository = statusRepository;
		this.actionTypeRepository = actionTypeRepository;
		this.actionRepository = actionRepository;
		this.callRepository = callRepository;
		this.orderRepository = orderRepository;

	}

	public Optional<Action> get(Long domainId, ActionEnum actionEnum) {
		Optional<ActionEntity> actionEntity = getEntity(domainId, actionEnum);
		if (actionEntity.isPresent()) {
			return Optional.of(Convert.actionEntity(actionEntity.get()));
		}
		return Optional.empty();
	}

	public Optional<ActionEntity> getEntity(Long domainId, ActionEnum actionEnum) {
		return actionRepository.getActionByDomainIdAndActionTypeId(domainId,
				actionEnum.id);

	}

	public List<ActionType> getActionTypes() {
		List<ActionType> actionTypes = new ArrayList<>();
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
		actionTypeEntities.forEach(actionTypeEntity -> 
			actionTypes.add(Convert.actionTypeEntity(actionTypeEntity))
		);
		return actionTypes;
	}

	public List<Action> getActionByDomainId(Long domainId) {
		List<Action> actions = new ArrayList<>();
		List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
		actionEntities.forEach(actionEntity -> 
			actions.add(Convert.actionEntity(actionEntity))
		);
		return actions;
	}

	public void synchronizeActions(Long companyId, Long domainId, User user) {
		Optional<DomainEntity> optionalDomainEntity = domainRepository.getDomainById(domainId, user);
		if (optionalDomainEntity.isPresent()) {
			List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
			List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll();

			List<ActionTypeEntity> actionTypeEntitiesNew = actionTypeEntities.stream().filter( actionTypeEntity -> 
				actionEntities.stream().noneMatch(b -> b.getActionType().getId().equals(actionTypeEntity.getId()))).collect(Collectors.toList());

			if (!actionTypeEntitiesNew.isEmpty()) {
				List<ActionEntity> newActionEntities = new ArrayList<>();
				actionTypeEntitiesNew.forEach(actionTypeEntity -> {
					ActionEntity actionEntity = new ActionEntity();
					actionEntity.setActionType(actionTypeEntity);
					actionEntity.setDomain(optionalDomainEntity.get());
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

	public boolean call(long domainId, long callId, ActionEnum actionEnum) {
		Optional<ActionEntity> actionEntityOptional = actionRepository.getActionByDomainIdAndActionTypeId(domainId, actionEnum.id);
		if (actionEntityOptional.isPresent()) {
			ActionEntity actionEntity = actionEntityOptional.get();
			
			if (actionEntity.getStatus() != null && actionEntity.getStatus().getId() != null) {
				Optional<CallEntity> callEntityOptional = callRepository.getCallById(callId, domainId);
				if (callEntityOptional.isPresent()) {
					CallEntity callEntity = callEntityOptional.get();
					callEntity.setStatus(actionEntity.getStatus());
					callRepository.saveAndFlush(callEntity);
				}
			}
		}
		return true;
	}

	@Override
	public boolean order(long domainId, long orderId, ActionEnum actionEnum) {
		Optional<OrderEntity> orderEntityOptional = orderRepository.getOrderById(orderId, domainId);
		if (orderEntityOptional.isPresent()) {
			OrderEntity orderEntity = orderEntityOptional.get();
			if (order(domainId, orderEntity, actionEnum)) {
				orderRepository.save(orderEntity);
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean order(long domainId, OrderEntity orderEntity, ActionEnum actionEnum) {

		Optional<ActionEntity> actionEntityOptional = actionRepository.getActionByDomainIdAndActionTypeId(domainId, actionEnum.id);
		if (actionEntityOptional.isEmpty()) {
			return false;
		}
		
		ActionEntity actionEntity = actionEntityOptional.get();
		ActionTypeEntity actionTypeEntity = actionEntity.getActionType();
		
		if (orderEntity.getActionTypeEntity() != null && orderEntity.getActionTypeEntity().getId().equals(actionTypeEntity.getId())) {
			return false;
		}

		orderEntity.setActionTypeEntity(actionTypeEntity);

		StatusEntity statusEntity = actionEntity.getStatus();
		if (statusEntity != null && statusEntity.getId() != null) {
			orderEntity.setStatus(statusEntity);
		}

		///////////////////////////////////////////////////
		// 
		///////////////////////////////////////////////////
		return true;
	}

	
}
