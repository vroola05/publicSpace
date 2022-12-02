package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Status;

public class PostStatusValidatorImpl implements ConstraintValidator<PostStatusValidator, Status> {
    @Override
    public void initialize(PostStatusValidator postStatus) {
    }

    @Override
    public boolean isValid(Status status, ConstraintValidatorContext context) {
        
        if (status.getId() != null) {
            setMessage(context, "id", "Waarde moet leeg zijn");
            return false;
        }
        return true;
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}