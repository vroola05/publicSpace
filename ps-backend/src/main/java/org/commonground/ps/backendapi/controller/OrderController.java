package org.commonground.ps.backendapi.controller;

import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.OrderService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Note;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.commonground.ps.backendapi.validators.PutCallGroupValidator;
import org.commonground.ps.backendapi.validators.PutCallUserValidator;
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
@RequestMapping(value = "/order", produces = { "application/json; charset=utf-8" })
public class OrderController extends Controller {

	@Autowired
	private OrderService orderService;
	
	@Secured(identifier = "getCallByOrderId", domainType = DomainTypeEnum.CONTRACTOR)
	@GetMapping("/{id}")
	public Call getCallByOrderId(@PathVariable long id) {
		Optional<Call> callOptional = orderService.getCallByOrderId(getUser(), id);
		if (callOptional.isEmpty()) {
			throw new NotFoundException();
		}

		return callOptional.get();
	}

	@Secured(identifier = "putOrderUser", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/user", consumes = "application/json", produces = "application/json")
	public Call putOrderUser(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutCallUserValidator @RequestBody User userNew) throws BadRequestException {

		Optional<Call> callOptional = orderService.setUser(getUser(), id, userNew);
		if (callOptional.isEmpty()) {
			throw new BadRequestException();
		}
		return callOptional.get();
	}

	@Secured(identifier = "putOrderGroup", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/group", consumes = "application/json", produces = "application/json")
	public Call putOrderGroup(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutCallGroupValidator @RequestBody Group groupNew) throws BadRequestException {
			Optional<Call> callOptional = orderService.setGroup(getUser(), id, groupNew);
			if (callOptional.isEmpty()) {
				throw new BadRequestException();
			}
			return callOptional.get();
	}

	@Secured(identifier = "putCallGroupAndUser", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/group/{groupId}", consumes = "application/json", produces = "application/json")
	public Call putCallGroupAndUser(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long groupId,
		@Valid @PutCallUserValidator @RequestBody User userNew) throws BadRequestException {

		// Optional<Call> callOptional = callService.setGroupAndUser(getUser(), id, groupId, userNew);

		// if (callOptional.isEmpty()) {
		// 	throw new BadRequestException();
		// }
		// return callOptional.get();
		return null;
	}

	@Secured(identifier = "putOrderActionType", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/action/{actionTypeId}", consumes = "application/json", produces = "application/json")
	public Call putOrderActionType(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long actionTypeId,
		@Valid @RequestBody Note Note) throws BadRequestException {

		return null;
	}

}
