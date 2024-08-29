package org.commonground.ps.backendapi.services.actioncenter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.jpa.repositories.ActionTypeRepository;
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
	
	

	public ActionServiceImpl(
			ActionRepository actionRepository,
			ActionTypeRepository actionTypeRepository,
			DomainRepository domainRepository,
			OrderRepository orderRepository,
			UserRepository userRepository,
			StatusRepository statusRepository,
			ActionQueue actionQueueService) {
		this.domainRepository = domainRepository;
		this.statusRepository = statusRepository;
		this.actionTypeRepository = actionTypeRepository;
		this.actionRepository = actionRepository;
		
		


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

	public void synchronizeActions(User user) {
		Optional<DomainEntity> optionalDomainEntity = domainRepository.getDomainById(user.getDomain().getId(), user);
		if (optionalDomainEntity.isPresent()) {
			DomainEntity domainEntity = optionalDomainEntity.get();
			List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(user.getDomain().getId());
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

	
}
