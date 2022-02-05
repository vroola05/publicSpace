package org.commonground.ps.backendapi.core;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.LocationEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.PersonEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
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
	private CallRepository callRepository;
    
	@Autowired
	private OrderRepository orderRepository;

    @Autowired
	ActionService actionService;

    @Autowired
	private CategoryRepository categoryRepository;

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
	public Optional<List<Order>> save(User user, Long id, List<Order> orders) {
		Optional<CallEntity> callEntityOptional = callService.getCallEntityById(user, id);

		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		CallEntity callEntity = callEntityOptional.get();

		List<ContractEntity> contractEntities = contractRepository.getContractByGovernmentDomainIdAccepted(user.getDomain().getId(), true);

		List<OrderEntity> orderEntities = new ArrayList<>();

		for (Order order: orders) {
			OrderEntity orderEntity = new OrderEntity();

			Long domainId = order.getContractorDomain().getId();

			Optional<ContractEntity> contractEntityOptional = contractEntities.stream().filter(contractEntity -> contractEntity.getDomainContractor().getId() == domainId).findFirst();
			if (contractEntityOptional.isEmpty()) {
				return Optional.empty();
			}

			ContractEntity contractEntity = contractEntityOptional.get();
			Optional<ActionEntity> actionEntityOptional = actionService.getEntity(domainId, ActionEnum.ORDER_CREATE);
			if (actionEntityOptional.isEmpty() || actionEntityOptional.get().getStatus() == null) {
				return Optional.empty();
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


			orderEntities.add(orderEntity);

		}
		if (!orderEntities.isEmpty()) {
			callRepository.save(callEntity);
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<Call> setGroup(User user, Long id, Group groupNew) {
		// TODO Auto-generated method stub
		return null;
	}


}
