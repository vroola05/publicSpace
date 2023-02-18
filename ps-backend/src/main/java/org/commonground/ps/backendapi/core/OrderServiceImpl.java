package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderNoteService orderNoteService;

    @Autowired
	ActionService actionService;

	@Autowired
	private ContractSpecificationItemService contractSpecificationItemService;

    @Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	CallService callService;

	@Override
	public Optional<Call> getCallByOrderId(User user, Long id) {
		Optional<OrderEntity> orderEntityOptional =  orderRepository.getOrderById(id, user.getDomain().getId());
		if (orderEntityOptional.isEmpty()) {
			return Optional.empty();
		}
		Call call = Convert.callEntity(orderEntityOptional.get().getCall(), user.getDomain().getDomainType());

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
    public Optional<OrderEntity> getOrderEntityById(User user, Long id, DomainTypeEnum domainTypeEnum) {

		Optional<OrderEntity> orderEntityOptional = (user.getDomain().getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) 
			? orderRepository.getOrderByIdAndGovernmentId(id, user.getDomain().getId()) 
			: orderRepository.getOrderById(id, user.getDomain().getId());

        if (!orderEntityOptional.isEmpty() && !hasAccess(user, orderEntityOptional.get(), domainTypeEnum)) {
            return Optional.empty();
        }

        return orderEntityOptional;
    }
	
    public boolean hasAccess(User user, OrderEntity orderEntity, DomainTypeEnum domainTypeEnum) {
		if (user.getDomain().getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
			return user.getGroups().stream().anyMatch(group -> group.getId() == orderEntity.getCall().getGroup().getId())
            	|| (orderEntity.getCall().getUser() != null && user.getId() == orderEntity.getCall().getUser().getId())
				|| (orderEntity.getCall().getUser() == null && user.getRoles().stream().anyMatch(role -> role.equalsIgnoreCase("ROLE_SUPER_USER") || role.equalsIgnoreCase("ROLE_ADMIN")));
		} else {
			return user.getGroups().stream().anyMatch(group -> group.getId() == orderEntity.getGroup().getId())
				|| (orderEntity.getUser() != null && user.getId() == orderEntity.getUser().getId())
				|| (orderEntity.getUser() == null && user.getRoles().stream().anyMatch(role -> role.equalsIgnoreCase("ROLE_SUPER_USER") || role.equalsIgnoreCase("ROLE_ADMIN")));
		}
    }

	@Override
	public Optional<List<Order>> save(User user, Long id, List<Order> orders) {
		Optional<CallEntity> callEntityOptional = callService.getCallEntityById(user, id);

		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		Map<Long, OrderEntity> existingOrders = new HashMap<>();
		CallEntity callEntity = callEntityOptional.get();
		if (callEntity.getOrders() == null) {
			callEntity.setOrders(new ArrayList<>());
		}

		for (OrderEntity o : callEntity.getOrders()) {
			existingOrders.put(o.getId(), o);
		}

		List<ContractEntity> contractEntities = contractRepository.getContractByGovernmentDomainIdAccepted(user.getDomain().getId(), true);

		for (Order order: orders) {
			OrderEntity orderEntity = new OrderEntity();

			Long domainId = order.getContractorDomain().getId();

			Optional<ContractEntity> contractEntityOptional = contractEntities.stream().filter(contractEntity -> contractEntity.getDomainContractor().getId() == domainId).findFirst();
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
				List<CategoryEntity> categoryEntities = categoryRepository.getCategoriesByDomainId(domainId, new Date());

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
			

			order = Convert.orderEntity(orderRepository.save(orderEntity), user.getDomain().getDomainType());
		}

		return Optional.of(orders);
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

	@Override
	public Optional<Call> setUser(User user, Long id, User userNew) {
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, id, DomainTypeEnum.CONTRACTOR);

		if (orderEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		OrderEntity orderEntity = orderEntityOptional.get();

		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), userNew.getId());

		if (userEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		UserEntity userEntity = userEntityOptional.get();

		if (userEntity.getGroups().stream().noneMatch(group -> group.getId() == orderEntity.getGroup().getId())) {
			return Optional.empty();
		}

		orderEntity.setUser(userEntity);

		orderRepository.saveAndFlush(orderEntity);

		actionService.order(user.getDomain().getId(), id, ActionEnum.ASSIGN_PERSON);

		return getCallByOrderId(user, id);
	}

	@Override
	public Optional<Call> setGroup(User user, Long id, Group groupNew) {
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, id, DomainTypeEnum.CONTRACTOR);
	
		if (orderEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		OrderEntity orderEntity = orderEntityOptional.get();

		Optional<GroupEntity> groupEntityOptional = groupRepository.getGroupById(groupNew.getId(), user.getDomain().getId());

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
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, order.getId(), DomainTypeEnum.CONTRACTOR);
		if (orderEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}

		OrderEntity orderEntity = orderEntityOptional.get();
		
		List<ContractSpecificationItemEntity> contractSpecificationItemEntities = contractSpecificationItemService.getContractSpecificationItemEntities(orderEntity.getCall().getDomain().getId(), user.getDomain().getId());

		List<OrderSpecificationItem> orderSpecificationItems = order.getOrderSpecificationItems();
		for (OrderSpecificationItem orderSpecificationItem : orderSpecificationItems) {
			if (orderSpecificationItem.getContractSpecificationItem() != null) {
				Optional<OrderSpecificationItemEntity> orderSpecificationItemEntityOptional = orderEntity.getOrderSpecificationItems().stream().filter(orderSpecificationItemEntity -> orderSpecificationItem.getContractSpecificationItem().getId() == orderSpecificationItemEntity.getContractSpecificationItem().getId()).findFirst();
				if (orderSpecificationItemEntityOptional.isPresent()) {
					OrderSpecificationItemEntity orderSpecificationItemEntity = orderSpecificationItemEntityOptional.get();
					orderSpecificationItemEntity.setAmount(orderSpecificationItem.getAmount());
				} else {
					Optional<ContractSpecificationItemEntity> contractSpecificationItemEntityOptional = contractSpecificationItemEntities.stream().filter(contractSpecificationItemEntity -> contractSpecificationItemEntity.getId() == orderSpecificationItem.getContractSpecificationItem().getId()).findFirst();
					if (contractSpecificationItemEntityOptional.isEmpty()) {
						throw new BadRequestException();
					}
					OrderSpecificationItemEntity orderSpecificationItemEntity = new OrderSpecificationItemEntity();
					orderSpecificationItemEntity.setOrder(orderEntity);
					orderSpecificationItemEntity.setContractSpecificationItem(contractSpecificationItemEntityOptional.get());
					orderSpecificationItemEntity.setAmount(orderSpecificationItem.getAmount());
					orderEntity.getOrderSpecificationItems().add(orderSpecificationItemEntity);
				}
			}
		}

		orderEntity.getOrderSpecificationItems().removeIf(orderSpecificationItemEntity -> orderSpecificationItems.stream().noneMatch(orderSpecificationItem -> orderSpecificationItem.getContractSpecificationItem().getId() == orderSpecificationItemEntity.getContractSpecificationItem().getId()));

		orderNoteService.addNew(orderEntity, order, user, definite);

		return Convert.orderEntity(orderRepository.saveAndFlush(orderEntity), user.getDomain().getDomainType());
	}

	@Override
	public Call setAction(User user, Order order, ActionEnum actionEnum, DomainTypeEnum domainTypeEnum) throws BadRequestException {
		Optional<OrderEntity> orderEntityOptional = getOrderEntityById(user, order.getId(), domainTypeEnum);

		if (orderEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}

		if (isOrderClosed(orderEntityOptional.get().getActionTypeEntity())) {
			throw new BadRequestException("Order is already closed");
		}

		OrderEntity orderEntity = orderEntityOptional.get();

		if (!isAllowedAction(orderEntity.getActionTypeEntity().getId(), user.getDomain().getDomainType())) {
			throw new BadRequestException();
		}

		if (!actionService.order(orderEntity.getDomain().getId(), orderEntity, actionEnum)) {
			throw new BadRequestException();
		}
		OrderEntity orderEntityUpdated = orderRepository.save(orderEntity);

		CallEntity callEntity = orderEntityUpdated.getCall();
		if (areAllOrdersClosed(callEntity)) {
			actionService.call(callEntity.getDomain().getId(), callEntity.getId(), ActionEnum.CALL_ALL_ORDERS_CLOSED);
			
			orderEntityOptional = getOrderEntityById(user, order.getId(), domainTypeEnum);
			if (orderEntityOptional.isPresent()) {
				Call call = Convert.callEntity(orderEntityOptional.get().getCall(), user.getDomain().getDomainType());
				addOrderToCall(user.getDomain().getDomainType(), call, orderEntityOptional.get());
				return call;
			}
		} else if (isCallAction(orderEntityUpdated.getActionTypeEntity())) {
			actionService.call(callEntity.getDomain().getId(), callEntity.getId(), ActionEnum.valueOfId(orderEntityUpdated.getActionTypeEntity().getId()));

			orderEntityOptional = getOrderEntityById(user, order.getId(), domainTypeEnum);
			if (orderEntityOptional.isPresent()) {
				Call call = Convert.callEntity(orderEntityOptional.get().getCall(), user.getDomain().getDomainType());
				addOrderToCall(user.getDomain().getDomainType(), call, orderEntityOptional.get());
				return call;
			}
		}

		Call call = Convert.callEntity(orderEntityUpdated.getCall(), user.getDomain().getDomainType());
		addOrderToCall(user.getDomain().getDomainType(), call, orderEntityOptional.get());
		return call;
	}

	public boolean isAllowedAction(Long actionTypeId, DomainType domainType) {
		if (domainType.getId() == DomainTypeEnum.GOVERNMENT.id) {
			return actionTypeId == ActionEnum.ORDER_CREATE.id
				|| actionTypeId == ActionEnum.ORDER_DONE.id
				|| actionTypeId == ActionEnum.ORDER_REJECT.id;
		} else if (domainType.getId() == DomainTypeEnum.GOVERNMENT.id) {
			return actionTypeId == ActionEnum.ORDER_CREATE.id
				|| actionTypeId == ActionEnum.ORDER_ACCEPT.id
				|| actionTypeId == ActionEnum.ORDER_DONE_REJECT.id;
		}
		return false;
	}

	public boolean isCallAction(ActionTypeEntity actionTypeEntity) {
		return ActionEnum.ORDER_CREATE.id == actionTypeEntity.getId()
			|| ActionEnum.ORDER_CANCEL.id == actionTypeEntity.getId()
			|| ActionEnum.ORDER_ACCEPT.id == actionTypeEntity.getId()
			|| ActionEnum.ORDER_REJECT.id == actionTypeEntity.getId()
			|| ActionEnum.ORDER_DONE.id == actionTypeEntity.getId()
			|| ActionEnum.ORDER_DONE_REJECT.id == actionTypeEntity.getId()
			|| ActionEnum.ORDER_CLOSE.id == actionTypeEntity.getId();
	}
	public boolean isOrderClosed(ActionTypeEntity actionTypeEntity) {
		return ActionEnum.ORDER_CANCEL.id == actionTypeEntity.getId()
			|| ActionEnum.ORDER_CLOSE.id == actionTypeEntity.getId();
	}

	public boolean areAllOrdersClosed(CallEntity callEntity) {
		return callEntity.getOrders().stream().allMatch(orderEntity -> isOrderClosed(orderEntity.getActionTypeEntity()));
	}

}
