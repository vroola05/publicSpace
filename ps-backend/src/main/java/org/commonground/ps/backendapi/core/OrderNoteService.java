package org.commonground.ps.backendapi.core;


import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.OrderNoteEntity;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.OrderNote;
import org.commonground.ps.backendapi.model.User;

public interface OrderNoteService {
    public OrderNoteEntity save(Long id, OrderNote orderNote, User user) throws BadRequestException;
    public void saveNew(Order order, User user, boolean definite);
}
