package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.ContractService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.model.Category;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.commonground.ps.backendapi.validators.PostOrderValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/call/{callId}/order", produces = { "application/json; charset=utf-8" })
public class OrderController extends Controller {

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private ContractService contractService;

	@Autowired
	ActionService actionService;

	@Autowired
	private CallRepository callRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Secured(identifier = "getOrderContracts")
	@GetMapping(value = "/contract")
	public List<Contract> getOrderContracts() {
		return contractService.getContracts(getUser().getDomain().getId(), true);
	}

	@Secured(identifier = "postOrders")
	@PostMapping(consumes = "application/json", produces = "application/json")
	public List<Order> postOrders(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long callId,
		@Valid @PostOrderValidator @RequestBody List<Order> orders) {

		User user = getUser();

		Optional<CallEntity> callEntityOptional = callRepository.getCallById(callId, user.getDomain().getId());
		if (callEntityOptional.isEmpty()) {
			throw new NotFoundException();
		}

		CallEntity callEntity = callEntityOptional.get();

		List<ContractEntity> contractEntities = contractRepository.getContractByGovernmentDomainIdAccepted(user.getDomain().getId(), true);

		List<OrderEntity> orderEntities = new ArrayList<>();

		for (Order order: orders) {
			OrderEntity orderEntity = new OrderEntity();

			Long domainId = order.getContractorDomain().getId();

			Optional<ContractEntity> contractEntityOptional = contractEntities.stream().filter(contractEntity -> contractEntity.getDomainContractor().getId() == domainId).findFirst();
			if (contractEntityOptional.isEmpty()) {
				throw new BadRequestException("No contract for contractor " + order.getContractorDomain().getName());
			}

			ContractEntity contractEntity = contractEntityOptional.get();
			Optional<ActionEntity> actionEntityOptional = actionService.getEntity(domainId, ActionEnum.ORDER_CREATE);
			if (actionEntityOptional.isEmpty() || actionEntityOptional.get().getStatus() == null) {
				throw new BadRequestException("No status is defined for action");
			}

			orderEntity.setStatus(actionEntityOptional.get().getStatus());
			orderEntity.setDateCreated(new Date());
			orderEntity.setDescription(order.getDescription());
			orderEntity.setDomain(contractEntity.getDomainContractor());
			orderEntity.setCall(callEntity);
			callEntity.getOrders().add(orderEntity);
			
			if (!order.getCategories().isEmpty()) {
				List<CategoryEntity> categoryEntities = categoryRepository.getCategoriesByDomainId(domainId, new Date());

				if (categoryEntities.isEmpty()) {
					BadRequestException badRequest = new BadRequestException("Nog group found for contractor " + order.getContractorDomain().getName());
					throw badRequest;
				}

				orderEntity.setGroup(categoryEntities.get(0).getGroup());
				addOrderCategories(order, orderEntity, categoryEntities);
			} else {
				Optional<GroupEntity> groupOptional = groupRepository.getGroups(domainId).stream().findFirst();
				if (groupOptional.isPresent()) {
					orderEntity.setGroup(groupOptional.get());
				} else {
					throw new BadRequestException("Nog group found for contractor " + order.getContractorDomain().getName());
				}
			}


			orderEntities.add(orderEntity);

		}
		if (!orderEntities.isEmpty()) {
			callRepository.save(callEntity);
			//orderRepository.saveAll(orderEntities);
		}

		
		return orders;
	}

	public void addOrderCategories(Order order, OrderEntity orderEntity, List<CategoryEntity> categoryEntities) {
		for (Category category:  order.getCategories()) {
			Optional<CategoryEntity> categoryEntity = categoryEntities.stream().filter(ce -> category.getId() == ce.getId()).findFirst();
			if (categoryEntity.isPresent()) {
				OrderCategoryEntity orderCategoryEntity = new OrderCategoryEntity();
				orderCategoryEntity.setOrder(orderEntity);
				orderCategoryEntity.setCategory(categoryEntity.get());
				
				orderEntity.getOrderCategory().add(orderCategoryEntity);
			}
			
		}
	}
}
