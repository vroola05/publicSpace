package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderNoteEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.User;

public interface OrderNoteService {
    public OrderNoteEntity createOrderNoteEntity(String content, UserEntity userEntity);
    public Optional<OrderNoteEntity> save(OrderEntity orderEntity, String content, User user, boolean definite);
    public void addNew(OrderEntity orderEntity, Order order, User user, boolean definite);
    public Optional<List<OrderNoteEntity>> saveNew(OrderEntity orderEntity, Order order, User user, boolean definite);
}
