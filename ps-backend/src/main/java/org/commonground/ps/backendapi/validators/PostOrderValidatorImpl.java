package org.commonground.ps.backendapi.validators;

import java.util.List;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Order;

public class PostOrderValidatorImpl  implements ConstraintValidator<PostOrderValidator, List<Order>> {
    @Override
    public void initialize(PostOrderValidator postCall) {
    }

    @Override
    public boolean isValid(List<Order> orders, ConstraintValidatorContext context) {

        if (orders == null || orders.isEmpty()) {
            setMessage(context, "orders", "Er zijn geen opdrachten");
            return false;	
        }

        for (Order order : orders) {
            if (order.getId() != null) {
                setMessage(context, "id", "Waarde moet leeg zijn");
                return false;
            }
        }

        return true;
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}