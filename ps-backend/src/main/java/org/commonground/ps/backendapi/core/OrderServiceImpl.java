package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Category;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderRepository orderRepository;

    @Autowired
	ActionService actionService;

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

		List<Order> orders = new ArrayList<>();
		orders.add(Convert.orderEntity(orderEntityOptional.get()));

		call.setOrders(orders);
		return Optional.of(call);
	}

	@Override
    public Optional<OrderEntity> getOrderEntityById(User user, Long id) {
		Optional<OrderEntity> orderEntityOptional = orderRepository.getOrderById(id, user.getDomain().getId());

        if (!orderEntityOptional.isEmpty() && !hasAccess(user, orderEntityOptional.get())) {
            return Optional.empty();
        }
        
        return orderEntityOptional;
    }
	
    public boolean hasAccess(User user, OrderEntity orderEntity) {
        return user.getGroups().stream().anyMatch(group -> group.getId() == orderEntity.getGroup().getId())
            || (orderEntity.getUser() != null && user.getId() == orderEntity.getUser().getId())
			|| (orderEntity.getUser() == null && user.getRoles().stream().anyMatch(role -> role.equalsIgnoreCase("ROLE_SUPER_USER") || role.equalsIgnoreCase("ROLE_ADMIN")));
    }

	@Override
	public Optional<List<Order>> save(User user, Long id, List<Order> orders) {
		Optional<CallEntity> callEntityOptional = callService.getCallEntityById(user, id);

		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		Map<Long, OrderEntity> existingOrders = new HashMap<>();
		CallEntity callEntity = callEntityOptional.get();
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
			if (!actionService.order(orderEntity.getDomain().getId(), orderEntity, ActionEnum.ORDER_CREATE)) {
				return Optional.empty();
			}
			order = Convert.orderEntity(orderRepository.save(orderEntity));
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

		if(userEntity.getGroups().stream().noneMatch(group -> group.getId() == orderEntity.getGroup().getId())) {
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
		// TODO Auto-generated method stub
		return null;
	}


}
