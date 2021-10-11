package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
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
	private ActionService actionService;

	@Secured(admin = true)
	@GetMapping(value = "/type")
	public List<ActionType> getActionTypes(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);

		return actionService.getActionTypes();
	}

	@Secured(admin = true)
	@GetMapping()
	public List<Action> getAction(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {
		isValid(companyId, domainId);

		actionService.synchronizeActions(companyId, domainId, getUser());

		return actionService.getActionByDomainId(domainId);
	}

	@Secured(identifier = "putAction")
	@PutMapping(value = "/{actionTypeId}", consumes = "application/json")
	public Action putAction(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long actionTypeId,
		@Valid @RequestBody Action action) throws BadRequestException {

		isValid(companyId, domainId);

		return actionService.updateAction(domainId, action);
	}
}
