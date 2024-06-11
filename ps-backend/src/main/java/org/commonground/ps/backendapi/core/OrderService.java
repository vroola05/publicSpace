package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;

public interface OrderService {
    public Optional<Call> getCallByOrderId(User user, Long id);
    public Optional<OrderEntity> getOrderEntityById(User user, Long id);

    public Optional<List<Order>> save(User user, Long id, List<Order> orders);
    public Order update(User user, Long id, Order order, boolean definite);
    public Optional<Call> setUser(User user, Long id, User userNew);
    public Optional<Call> setGroup(User user, Long id, Group groupNew);
    public Optional<Call> setGroupAndUser(User user, Long id, Long groupId, User userNew);
    public Call setAction(User user, Order order, ActionEnum actionEnum);
}
