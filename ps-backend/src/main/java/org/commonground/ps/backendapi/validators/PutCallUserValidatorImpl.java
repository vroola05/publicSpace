package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.User;

public class PutCallUserValidatorImpl  implements ConstraintValidator<PutCallUserValidator, User> {
    @Override
    public void initialize(PutCallUserValidator putCallUserValidator) {
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        if (user == null) {
            setMessage(context, "user", "Not null");
            return false;
        }
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