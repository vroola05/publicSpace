package org.commonground.ps.backendapi.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.CallService;
import org.commonground.ps.backendapi.core.ContractService;
import org.commonground.ps.backendapi.core.OrderService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.commonground.ps.backendapi.validators.PostCallValidator;
import org.commonground.ps.backendapi.validators.PostOrderValidator;
import org.commonground.ps.backendapi.validators.PutCallGroupValidator;
import org.commonground.ps.backendapi.validators.PutCallUserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/call", produces = { "application/json; charset=utf-8" })
public class CallController extends Controller {
	@Autowired
	private ContractService contractService;
	
	@Autowired
	private ActionService actionService;

	@Autowired
	private CallService callService;
	
	@Autowired
	private OrderService orderService;

	@Secured(identifier = "getCallById", domainType = DomainTypeEnum.GOVERNMENT)
	@GetMapping("/{id}")
	public Call getCallById(@PathVariable long id) {
		Optional<Call> callOptional = callService.getCallById(getUser(), id);
		if (callOptional.isEmpty()) {
			throw new NotFoundException();
		}

		return callOptional.get();
	}

	@Secured(identifier = "postCall")
	@PostMapping(consumes = "application/json", produces = "application/json")
	public Call postCall(@Valid @PostCallValidator @RequestBody Call call) throws BadRequestException {
		Optional<ActionEntity> actionEntityOptional = actionService.getEntity(getUser().getDomain().getId(), ActionEnum.CALL_CREATE);
		if (!actionEntityOptional.isPresent() || actionEntityOptional.get().getStatus() == null) {
			BadRequestException badRequest = new BadRequestException();
			badRequest.addError(new FieldValue("status", "No status is defined for action"));
			throw badRequest;
		}

		Optional<Call> callNew = callService.save(getUser(), call);
		
		if (callNew.isEmpty()) {
			throw new BadRequestException();
		}

		return callNew.get();
	}

	@Secured(identifier = "putCallUser", domainType = DomainTypeEnum.GOVERNMENT)
	@PutMapping(value = "/{id}/user", consumes = "application/json", produces = "application/json")
	public Call putCallUser(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutCallUserValidator @RequestBody User userNew) throws BadRequestException {

		Optional<Call> callOptional = callService.setUser(getUser(), id, userNew);
		if (callOptional.isEmpty()) {
			throw new BadRequestException();
		}
		return callOptional.get();
	}

	@Secured(identifier = "putCallGroup", domainType = DomainTypeEnum.GOVERNMENT)
	@PutMapping(value = "/{id}/group", consumes = "application/json", produces = "application/json")
	public Call putCallGroup(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutCallGroupValidator @RequestBody Group groupNew) throws BadRequestException {

		Optional<Call> callOptional = callService.setGroup(getUser(), id, groupNew);

		if (callOptional.isEmpty()) {
			throw new BadRequestException();
		}
		return callOptional.get();
	}

	@Secured(identifier = "putCallGroupAndUser", domainType = DomainTypeEnum.GOVERNMENT)
	@PutMapping(value = "/{id}/group/{groupId}", consumes = "application/json", produces = "application/json")
	public Call putCallGroupAndUser(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long groupId,
		@Valid @PutCallUserValidator @RequestBody User userNew) throws BadRequestException {

		Optional<Call> callOptional = callService.setGroupAndUser(getUser(), id, groupId, userNew);

		if (callOptional.isEmpty()) {
			throw new BadRequestException();
		}
		return callOptional.get();
	}

	@Secured(identifier = "postOrders", domainType = DomainTypeEnum.GOVERNMENT)
	@PostMapping(value = "/{id}/order", consumes = "application/json", produces = "application/json")
	public List<Order> postOrders(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PostOrderValidator @RequestBody List<Order> orders) {

		Optional<List<Order>> ordersOptional =  orderService.save(getUser(), id, orders);
		if (ordersOptional.isEmpty()) {
			throw new BadRequestException();
		}

		return ordersOptional.get();
	}

	@Secured(identifier = "getOrderContracts", domainType = DomainTypeEnum.CONTRACTOR)
	@GetMapping(value = "/{id}/order/contract")
	public List<Contract> getOrderContracts() {
		return contractService.getContracts(getUser().getDomain().getId(), true);
	}
}
