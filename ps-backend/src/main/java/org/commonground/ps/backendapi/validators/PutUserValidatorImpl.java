package org.commonground.ps.backendapi.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.User;

public class PutUserValidatorImpl  implements ConstraintValidator<PutUserValidator, User> {
    @Override
    public void initialize(PutUserValidator putUser) {
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        
        if (user.getId() == null) {
            setMessage(context, "id", "Waarde is verplicht");
            return false;
        }

        return true;
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}
