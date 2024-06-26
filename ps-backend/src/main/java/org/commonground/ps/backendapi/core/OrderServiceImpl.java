package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationItemEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderSpecificationItemEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Category;
import org.commonground.ps.backendapi.model.DomainType;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.OrderSpecificationItem;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final ActionService actionService;
	private final ContractSpecificationItemService contractSpecificationItemService;
	private final CategoryRepository categoryRepository;
	private final UserRepository userRepository;
	private final GroupRepository groupRepository;
	private final ContractRepository contractRepository;
	private final CallService callService;

	public OrderServiceImpl(
			ActionService actionService,
			CallService callService,
			CategoryRepository categoryRepository,
			ContractRepository contractRepository,
			ContractSpecificationItemService contractSpecificationItemService,
			GroupRepository groupRepository,
			OrderRepository orderRepository,
			UserRepository userRepository) {
		this.orderRepository = orderRepository;
		this.actionService = actionService;
		this.contractSpecificationItemService = contractSpecificationItemService;
		this.categoryRepository = categoryRepository;
		this.userRepository = userRepository;
		this.groupRepository = groupRepository;
		this.contractRepository = contractRepository;
		this.callService = callService;

	}

	@Override
	public Optional<Call> getCallByOrderId(User user, Long id) {
		Optional<OrderEntity> orderEntityOptional = orderRepository.getOrderById(id, user.getDomain().getId());
		if (orderEntityOptional.isEmpty()) {
			return Optional.empty();
		}
		Call call = Convert.callEntity(orderEntityOptional.get().getCall(), user);

		addOrderToCall(user.getDomain().getDomainType(), call, orderEntityOptional.get());

		return Optional.of(call);
	}

	public void addOrderToCall(DomainType domainType, Call call, OrderEntity orderEntity) {
		if (domainType.getId() == DomainTypeEnum.CONTRACTOR.id) {
			List<Order> orders = new ArrayList<>();
			orders.add(Convert.orderEntity(orderEntity, domainType));
			call.setOrders(orders);
		}
	}

	@Override
	public Optional<OrderEntity> getOrderEntityById(User user, Long id) {

		Optional<OrderEntity> orderEntityOptional = (user.getDomain().getDomainType()
				.getId() == DomainTypeEnum.GOVERNMENT.id)
						? orderRepository.getOrderByIdAndGovernmentId(id, user.getDomain().getId())
						: orderRepository.getOrderById(id, user.getDomain().getId());

		if (!orderEntityOptional.isEmpty() && !hasAccess(user, orderEntityOptional.get())) {
			return Optional.empty();
		}

		return orderEntityOptional;
	}

	public boolean hasAccess(User user, OrderEntity orderEntity) {
		if (user.getDomain().getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
			return user.getGroups().stream()
					.anyMatch(group -> group.getId().equals(orderEntity.getCall().getGroup().getId()))
					|| (orderEntity.getCall().getUser() != null
							&& user.getId().equals(orderEntity.getCall().getUser().getId()))
					|| (orderEntity.getCall().getUser() == null && user.getRoles().stream().anyMatch(
							role -> role.equalsIgnoreCase("ROLE_SUPER_USER") || role.equalsIgnoreCase("ROLE_ADMIN")));
		} else {
			return user.getGroups().stream().anyMatch(group -> group.getId().equals(orderEntity.getGroup().getId()))
					|| (orderEntity.getUser() != null && user.getId().equals(orderEntity.getUser().getId()))
					|| (orderEntity.getUser() == null && user.getRoles().stream().anyMatch(
							role -> role.equalsIgnoreCase("ROLE_SUPER_USER") || role.equalsIgnoreCase("ROLE_ADMIN")));
		}
	}

	@Override
	public Optional<List<Order>> save(User user, Long id, List<Order> orders) {
		Optional<CallEntity> callEntityOptional = callService.getCallEntityById(user, id);

		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		CallEntity callEntity = callEntityOptional.get();
		if (callEntity.getOrders() == null) {
			callEntity.setOrders(new ArrayList<>());
		}

		List<ContractEntity> contractEntities = contractRepository
				.getContractByGovernmentDomainIdAccepted(user.getDomain().getId(), true);

		for (Order order : orders) {
			OrderEntity orderEntity = new OrderEntity();

			Long domainId = order.getContractorDomain().getId();

			Optional<ContractEntity> contractEntityOptional = contractEntities.stream()
					.filter(contractEntity -> contractEntity.getDomainContractor().getId().equals(domainId))
					.findFirst();
			if (contractEntityOptional.isEmpty()) {
				return Optional.empty();
			}

			ContractEntity contractEntity = contractEntityOptional.get();
			orderEntity.setDateCreated(new Date());
			orderEntity.setDescription(order.getDescription());
			orderEntity.setDomain(contractEntity.getDomainContractor());
			orderEntity.setCall(callEntity);
			callEntity.getOrders().add(orderEntity);

			if (!order.getCategories().isEmpty()) {
				List<CategoryEntity> categoryEntities = categoryRepository.getCategoriesByDomainId(domainId,
						new Date());

				if (categoryEntities.isEmpty()) {
					return Optional.empty();
				}

				orderEntity.setGroup(categoryEntities.get(0).getGroup());
				addOrderCategories(order, orderEntity, categoryEntities);
			} else {
				Optional<GroupEntity> groupOptional = groupRepository.getGroups(domainId).stream().findFirst();
				if (groupOptional.isPresent()) {
					orderEntity.setGroup(groupOptional.get());
				} else {
					return Optional.empty();
				}
			}
			// Action type entity is requiered
			actionService.order(orderEntity.getDomain().getId(), orderEntity, ActionEnum.ORDER_CREATE);

		}

		actionService.call(user.getDomain().getId(), id, ActionEnum.ORDER_CREATE);
		return Optional.of(orders);
	}

	public void addOrderCategories(Order order, OrderEntity orderEntity, List<CategoryEntity> categoryEntities) {
		for (Category category : order.getCategories()) {
			Optional<CategoryEntity> categoryEntity = categoryEntities.stream()
					.filter(ce -> category.getId().equals(ce.getId())).findFirst();
			if (categoryEntity.isPresent()) {
				OrderCategoryEntity orderCategoryEntity = new OrderCategoryEntity();
				orderCategoryEntity.setOrder(orderEntity);
				orderCategoryEntity.setCategory(categoryEntity.get());

				orderEntity.getOrderCategory().add(orderCategoryEntity);
			}

		}
	}

	@Override
	public Optional<Call> setUser(User user, Long id, User userNew) {
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, id);

		if (orderEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		OrderEntity orderEntity = orderEntityOptional.get();

		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), userNew.getId());

		if (userEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		UserEntity userEntity = userEntityOptional.get();

		if (userEntity.getGroups().stream().noneMatch(group -> group.getId().equals(orderEntity.getGroup().getId()))) {
			return Optional.empty();
		}

		orderEntity.setUser(userEntity);

		orderRepository.saveAndFlush(orderEntity);

		actionService.order(user.getDomain().getId(), id, ActionEnum.ASSIGN_PERSON);

		return getCallByOrderId(user, id);
	}

	@Override
	public Optional<Call> setGroup(User user, Long id, Group groupNew) {
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, id);

		if (orderEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		OrderEntity orderEntity = orderEntityOptional.get();

		Optional<GroupEntity> groupEntityOptional = groupRepository.getGroupById(groupNew.getId(),
				user.getDomain().getId());

		if (groupEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		GroupEntity groupEntity = groupEntityOptional.get();

		orderEntity.setGroup(groupEntity);

		orderRepository.saveAndFlush(orderEntity);

		actionService.order(user.getDomain().getId(), orderEntity.getId(), ActionEnum.ASSIGN_GROUP);

		return getCallByOrderId(user, id);
	}

	@Override
	public Optional<Call> setGroupAndUser(User user, Long id, Long groupId, User userNew) {
		Group group = new Group();
		group.setId(groupId);

		if (setGroup(user, id, group).isEmpty()) {
			return Optional.empty();
		}
		return setUser(user, id, userNew);
	}

	@Override
	public Order update(User user, Long id, Order order, boolean definite) throws BadRequestException {
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, order.getId());
		if (orderEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}

		OrderEntity orderEntity = orderEntityOptional.get();

		List<ContractSpecificationItemEntity> contractSpecificationItemEntities = contractSpecificationItemService
				.getContractSpecificationItemEntities(orderEntity.getCall().getDomain().getId(),
						user.getDomain().getId());

		List<OrderSpecificationItem> orderSpecificationItems = order.getOrderSpecificationItems();
		for (OrderSpecificationItem orderSpecificationItem : orderSpecificationItems) {
			if (orderSpecificationItem.getContractSpecificationItem() != null) {
				Optional<OrderSpecificationItemEntity> orderSpecificationItemEntityOptional = orderEntity
						.getOrderSpecificationItems().stream()
						.filter(orderSpecificationItemEntity -> orderSpecificationItem.getContractSpecificationItem()
								.getId() == orderSpecificationItemEntity.getContractSpecificationItem().getId())
						.findFirst();
				if (orderSpecificationItemEntityOptional.isPresent()) {
					OrderSpecificationItemEntity orderSpecificationItemEntity = orderSpecificationItemEntityOptional
							.get();
					orderSpecificationItemEntity.setAmount(orderSpecificationItem.getAmount());
				} else {
					Optional<ContractSpecificationItemEntity> contractSpecificationItemEntityOptional = contractSpecificationItemEntities
							.stream()
							.filter(contractSpecificationItemEntity -> contractSpecificationItemEntity
									.getId().equals(orderSpecificationItem.getContractSpecificationItem().getId()))
							.findFirst();
					if (contractSpecificationItemEntityOptional.isEmpty()) {
						throw new BadRequestException();
					}
					OrderSpecificationItemEntity orderSpecificationItemEntity = new OrderSpecificationItemEntity();
					orderSpecificationItemEntity.setOrder(orderEntity);
					orderSpecificationItemEntity
							.setContractSpecificationItem(contractSpecificationItemEntityOptional.get());
					orderSpecificationItemEntity.setAmount(orderSpecificationItem.getAmount());
					orderEntity.getOrderSpecificationItems().add(orderSpecificationItemEntity);
				}
			}
		}

		orderEntity.getOrderSpecificationItems()
				.removeIf(orderSpecificationItemEntity -> orderSpecificationItems.stream()
						.noneMatch(orderSpecificationItem -> orderSpecificationItem.getContractSpecificationItem()
								.getId().equals(orderSpecificationItemEntity.getContractSpecificationItem().getId())));

		// orderNoteService.addNew(orderEntity, order, user, definite);

		return Convert.orderEntity(orderRepository.saveAndFlush(orderEntity), user.getDomain().getDomainType());
	}

	@Override
	public Call setAction(User user, Order order, ActionEnum actionEnum)
			throws BadRequestException {
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, order.getId());

		if (orderEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}

		OrderEntity orderEntity = orderEntityOptional.get();
		if (isOrderClosed(orderEntity.getActionTypeEntity())) {
			throw new BadRequestException("Order is already closed");
		}

		// Check if the acction is allowed
		if (!isAllowedAction(actionEnum, user.getDomain().getDomainType())) {
			throw new BadRequestException("Action is not allowed");
		}

		if (!actionService.order(orderEntity.getDomain().getId(), orderEntity, actionEnum)) {
			throw new BadRequestException("Action failed");
		}

		OrderEntity orderEntityUpdated = orderRepository.save(orderEntity);
		return Convert.callEntity(orderEntityUpdated.getCall(), user);

		////////////////////////////////////////////
		// Start Refactor
		////////////////////////////////////////////
		// CallEntity callEntity = orderEntityUpdated.getCall();
		// if (areAllOrdersClosed(callEntity)) {
		// 	actionService.call(callEntity.getDomain().getId(), callEntity.getId(), ActionEnum.CALL_ALL_ORDERS_CLOSED);

		// 	orderEntityOptional = getOrderEntityById(user, order.getId());
		// 	if (orderEntityOptional.isPresent()) {
		// 		Call call = Convert.callEntity(orderEntityOptional.get().getCall(), user);
		// 		addOrderToCall(user.getDomain().getDomainType(), call, orderEntityOptional.get());
		// 		return call;
		// 	}
		// } else if (isCallAction(orderEntityUpdated.getActionTypeEntity())) {
		// 	actionService.call(callEntity.getDomain().getId(), callEntity.getId(),
		// 			ActionEnum.valueOfId(orderEntityUpdated.getActionTypeEntity().getId()));

		// 	orderEntityOptional = getOrderEntityById(user, order.getId());
		// 	if (orderEntityOptional.isPresent()) {
		// 		Call call = Convert.callEntity(orderEntityOptional.get().getCall(), user);
		// 		addOrderToCall(user.getDomain().getDomainType(), call, orderEntityOptional.get());
		// 		return call;
		// 	}
		// }
		
		// Call call = Convert.callEntity(orderEntityUpdated.getCall(), user);
		// addOrderToCall(user.getDomain().getDomainType(), call, orderEntityOptional.get());
		// return call;
	}

	public boolean isAllowedAction(ActionEnum actionEnum, DomainType domainType) {
		if (domainType.getId() == DomainTypeEnum.GOVERNMENT.id) {
			return actionEnum.equals(ActionEnum.ORDER_CREATE)
					|| actionEnum.equals(ActionEnum.ORDER_DONE)
					|| actionEnum.equals(ActionEnum.ORDER_DONE_REJECT)
					|| actionEnum.equals(ActionEnum.ORDER_CLOSE)
					|| actionEnum.equals(ActionEnum.ORDER_CANCEL);
		} 
		if (domainType.getId() == DomainTypeEnum.CONTRACTOR.id) {
			return actionEnum.equals(ActionEnum.ORDER_ACCEPT)
					|| actionEnum.equals(ActionEnum.ORDER_REJECT)
					|| actionEnum.equals(ActionEnum.ORDER_DONE);
		}
		return false;
	}

	public boolean isCallAction(ActionTypeEntity actionTypeEntity) {
		return actionTypeEntity.getId().equals(ActionEnum.ORDER_CREATE.id)
				|| actionTypeEntity.getId().equals(ActionEnum.ORDER_CANCEL.id)
				|| actionTypeEntity.getId().equals(ActionEnum.ORDER_ACCEPT.id)
				|| actionTypeEntity.getId().equals(ActionEnum.ORDER_REJECT.id)
				|| actionTypeEntity.getId().equals(ActionEnum.ORDER_DONE.id)
				|| actionTypeEntity.getId().equals(ActionEnum.ORDER_DONE_REJECT.id)
				|| actionTypeEntity.getId().equals(ActionEnum.ORDER_CLOSE.id);
	}

	public boolean isOrderClosed(ActionTypeEntity actionTypeEntity) {
		return actionTypeEntity.getId().equals(ActionEnum.ORDER_CANCEL.id)
				|| actionTypeEntity.getId().equals(ActionEnum.ORDER_CLOSE.id);
	}

	public boolean areAllOrdersClosed(CallEntity callEntity) {
		return callEntity.getOrders().stream()
				.allMatch(orderEntity -> isOrderClosed(orderEntity.getActionTypeEntity()));
	}

}
