package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.ActionRepository;
import org.commonground.ps.backendapi.jpa.repositories.ActionTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/action", produces = {
		"application/json; charset=utf-8" })
public class ActionController extends Controller {

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private ActionTypeRepository actionTypeRepository;

	@Autowired
	private ActionRepository actionRepository;

	@Autowired
	private StatusRepository statusRepository;

	@Secured(admin = true)
	@GetMapping(value = "/type")
	public List<ActionType> getActionTypes(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);

		List<ActionType> actionTypes = new ArrayList<>();
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll();
		actionTypeEntities.forEach(actionTypeEntity -> {
			actionTypes.add(Convert.actionTypeEntity(actionTypeEntity));
		});
		return actionTypes;
	}

	@Secured(admin = true)
	@GetMapping()
	public List<Action> getAction(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {
		isValid(companyId, domainId);

		synchronizeActions(companyId, domainId);

		List<Action> actions = new ArrayList<>();
		List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
		actionEntities.forEach(actionEntity -> {
			actions.add(Convert.actionEntity(actionEntity));
		});

		return actions;
	}

	private void synchronizeActions(Long companyId, Long domainId) {
		List<ActionTypeEntity> actionTypeEntities = actionTypeRepository.findAll();
		List<ActionEntity> actionEntities = actionRepository.getActionByDomainId(domainId);
		if (actionTypeEntities.size() != actionEntities.size()) {
			List<ActionTypeEntity> newActionTypes = actionTypeEntities.stream().filter(a -> { return actionEntities.stream().noneMatch(b -> { return b.getActionType().getId() == a.getId(); }); }).collect(Collectors.toList());;

			Optional<DomainEntity> optionalDomainEntity = domainRepository.getDomainById(domainId, getUser());
			if (optionalDomainEntity.isPresent()) {
				List<ActionEntity> newActionEntities = new ArrayList<>();
				newActionTypes.forEach(actionTypeEntity -> {
					ActionEntity actionEntity = new ActionEntity();
					actionEntity.setActionType(actionTypeEntity);
					actionEntity.setDomain(optionalDomainEntity.get());
					newActionEntities.add(actionEntity);
				});
				actionRepository.saveAll(newActionEntities);
			}
		}
	}

	@Secured(identifier = "putAction")
	@PutMapping(value = "/{actionTypeId}", consumes = "application/json")
	public Action putAction(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long actionTypeId,
		@Valid @RequestBody Action action) throws BadRequestException {

		isValid(companyId, domainId);

		Optional<ActionEntity> optionalActionEntity = actionRepository.getActionByDomainIdAndActionTypeId(domainId, actionTypeId);
		if (optionalActionEntity.isPresent()){
			ActionEntity actionEntity = optionalActionEntity.get();
			
			if (action.getStatus() != null) {
				Optional<StatusEntity> statusEntity = statusRepository.getStatusByDomainIdAndById(domainId, action.getStatus().getId());
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
}
