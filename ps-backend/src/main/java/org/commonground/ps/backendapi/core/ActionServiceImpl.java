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
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.jpa.repositories.ActionTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActionServiceImpl implements ActionService {

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private StatusRepository statusRepository;

	@Autowired
	private ActionTypeRepository actionTypeRepository;

	@Autowired
	private ActionRepository actionRepository;

	@Autowired
	private CallRepository callRepository;

	public Action get(Long domainId, ActionEnum actionEnum) {
		Optional<ActionEntity> actionEntity = actionRepository.getActionByDomainIdAndActionTypeId(domainId,
				actionEnum.id);
		if (actionEntity.isPresent()) {
			return Convert.actionEntity(actionEntity.get());
		}
		return null;
	}

	public List<ActionType> getActionTypes() {
		List<ActionType> actionTypes = new ArrayList<>();
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll();
		actionTypeEntities.forEach(actionTypeEntity -> {
			actionTypes.add(Convert.actionTypeEntity(actionTypeEntity));
		});
		return actionTypes;
	}

	public List<Action> getActionByDomainId(Long domainId) {
		List<Action> actions = new ArrayList<>();
		List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
		actionEntities.forEach(actionEntity -> {
			actions.add(Convert.actionEntity(actionEntity));
		});
		return actions;
	}

	public void synchronizeActions(Long companyId, Long domainId, User user) {
		Optional<DomainEntity> optionalDomainEntity = domainRepository.getDomainById(domainId, user);
		if (optionalDomainEntity.isPresent()) {
			DomainEntity domainEntity = optionalDomainEntity.get();

			List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
			List<ActionTypeEntity> actionTypeEntitiesAll = actionTypeRepository.findAll();

			List<ActionTypeEntity> actionTypeEntities = actionTypeEntitiesAll.stream().filter( actionTypeEntity -> 
				actionTypeEntity.getDomainType() == null || actionTypeEntity.getDomainType().getId() == domainEntity.getDomainType().getId()).collect(Collectors.toList());


			List<ActionTypeEntity> actionTypeEntitiesNew = actionTypeEntities.stream().filter( actionTypeEntity -> 
				actionEntities.stream().noneMatch(b -> b.getActionType().getId() == actionTypeEntity.getId())).collect(Collectors.toList());

			if (!actionTypeEntitiesNew.isEmpty()) {
				List<ActionEntity> newActionEntities = new ArrayList<>();
				actionTypeEntitiesNew.forEach(actionTypeEntity -> {
					ActionEntity actionEntity = new ActionEntity();
					actionEntity.setActionType(actionTypeEntity);
					actionEntity.setDomain(optionalDomainEntity.get());
					newActionEntities.add(actionEntity);
				});
				System.out.println("newActionEntities: " + newActionEntities.size());
				actionRepository.saveAll(newActionEntities);
			}

			List<ActionEntity> actionDelete = actionEntities.stream().filter( actionEntity -> 
				actionTypeEntities.stream().noneMatch(b -> b.getId() == actionEntity.getActionType().getId())).collect(Collectors.toList());

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
		return actionTypeRepository.getById(id);
	}

	public boolean call(long domainId, long callId, ActionEnum actionEnum) {
		Optional<ActionEntity> actionEntityOptional = actionRepository.getActionByDomainIdAndActionTypeId(domainId, actionEnum.id);
		if (actionEntityOptional.isPresent()) {
			ActionEntity actionEntity = actionEntityOptional.get();
			
			if (actionEntity.getStatus() != null && actionEntity.getStatus().getId() != null) {
				CompanyEntity companyEntity = actionEntity.getDomain().getCompany();
				Optional<CallEntity> callEntityOptional = callRepository.getCallById(callId, companyEntity.getId());
				if (callEntityOptional.isPresent()) {
					CallEntity callEntity = callEntityOptional.get();
					callEntity.setStatus(actionEntity.getStatus());
					callRepository.saveAndFlush(callEntity);
				}
			}
		}
		return true;
	}
}
