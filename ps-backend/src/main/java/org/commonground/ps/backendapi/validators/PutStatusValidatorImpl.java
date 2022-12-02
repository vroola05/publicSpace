package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Status;

public class PutStatusValidatorImpl  implements ConstraintValidator<PutStatusValidator, Status> {
    @Override
    public void initialize(PutStatusValidator putStatus) {
    }

    @Override
    public boolean isValid(Status status, ConstraintValidatorContext context) {
        if (status.getId() == null) {
            setMessage(context, "id", "Waarde is verplicht!");
            return false;
        }
        return true;
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}