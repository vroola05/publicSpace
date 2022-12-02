package org.commonground.ps.backendapi.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.ContractSpecificationItemService;
import org.commonground.ps.backendapi.core.OrderService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.ContractSpecificationItem;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;
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
	

	@Autowired
	private ContractSpecificationItemService contractSpecificationItemService;

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

	@Secured(identifier = "putOrderGroupAndUser", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/group/{groupId}", consumes = "application/json", produces = "application/json")
	public Call putCallGroupAndUser(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long groupId,
		@Valid @PutCallUserValidator @RequestBody User userNew) throws BadRequestException {

		Optional<Call> orderOptional = orderService.setGroupAndUser(getUser(), id, groupId, userNew);
		if (orderOptional.isEmpty()) {
			throw new BadRequestException();
		}

		return orderOptional.get();
	}

	@Secured(identifier = "getContractSpecificationItemsByOrderId")
	@GetMapping(value = "/{id}/specification-items")
	public List<ContractSpecificationItem> getContractSpecificationItemsByOrderId(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long id) {

		User user = getUser(); 
		Optional<OrderEntity> orderEntityOptional = orderService.getOrderEntityById(user, id);
		if (orderEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}

		OrderEntity orderEntity = orderEntityOptional.get();

		return contractSpecificationItemService.getContractSpecificationItems(orderEntity.getCall().getDomain().getId(), user.getDomain().getId());
	}
	
	@Secured(identifier = "putActionOrderCancel", domainType = DomainTypeEnum.GOVERNMENT)
	@PutMapping(value = "/{id}/action/cancel", consumes = "application/json", produces = "application/json")
	public Order putActionOrderCancel(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @RequestBody Order order) throws BadRequestException {

		return orderService.setAction(getUser(), order, ActionEnum.ORDER_CANCEL);
	}

	@Secured(identifier = "putActionOrderRejectDone", domainType = DomainTypeEnum.GOVERNMENT)
	@PutMapping(value = "/{id}/action/reject-done", consumes = "application/json", produces = "application/json")
	public Order putActionOrderRejectDone(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @RequestBody Order order) throws BadRequestException {

		return orderService.setAction(getUser(), order, ActionEnum.ORDER_DONE_REJECT);
	}

	@Secured(identifier = "putActionOrderClose", domainType = DomainTypeEnum.GOVERNMENT)
	@PutMapping(value = "/{id}/action/close", consumes = "application/json", produces = "application/json")
	public Order putOrderActionType(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @RequestBody Order order) throws BadRequestException {
		return orderService.setAction(getUser(), order, ActionEnum.ORDER_CLOSE);
	}

	@Secured(identifier = "putActionOrderAccept", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/action/accept", consumes = "application/json", produces = "application/json")
	public Order putActionOrderAccept(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @RequestBody Order order) throws BadRequestException {
		return orderService.setAction(getUser(), order, ActionEnum.ORDER_ACCEPT);
	}

	@Secured(identifier = "putActionOrderReject", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/action/reject", consumes = "application/json", produces = "application/json")
	public Order putActionOrderReject(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @RequestBody Order order) throws BadRequestException {
		return orderService.setAction(getUser(), order, ActionEnum.ORDER_REJECT);
	}

	@Secured(identifier = "putActionOrderDone", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}/action/done", consumes = "application/json", produces = "application/json")
	public Order putActionOrderDone(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @RequestBody Order order) throws BadRequestException {
		return orderService.setAction(getUser(), order, ActionEnum.ORDER_DONE);
	}
}
