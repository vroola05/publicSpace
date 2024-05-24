package org.commonground.ps.backendapi.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Group;

public class PutCallGroupValidatorImpl  implements ConstraintValidator<PutCallGroupValidator, Group> {
    @Override
    public void initialize(PutCallGroupValidator putCallGroupValidator) {
    }

    @Override
    public boolean isValid(Group group, ConstraintValidatorContext context) {
        if (group == null) {
            setMessage(context, "group", "Not null");
            return false;
        }
        if (group.getId() == null) {
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