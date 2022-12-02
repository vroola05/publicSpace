package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Group;

public class PutGroupValidatorImpl  implements ConstraintValidator<PutGroupValidator, Group> {
    @Override
    public void initialize(PutGroupValidator postCompany) {
    }

    @Override
    public boolean isValid(Group group, ConstraintValidatorContext context) {
        if (group.getId() == null) {
            setMessage(context, "id", "Waarde mag niet leeg zijn");
            return false;
        }
        return true;
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}