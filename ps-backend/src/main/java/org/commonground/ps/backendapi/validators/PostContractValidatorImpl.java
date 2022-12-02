package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Contract;

public class PostContractValidatorImpl implements ConstraintValidator<PostContractValidator, Contract> {
    @Override
    public void initialize(PostContractValidator postContract) {
    }

    @Override
    public boolean isValid(Contract contract, ConstraintValidatorContext context) {
        
        if (contract.getId() != null) {
            setMessage(context, "id", "Waarde moet leeg zijn");
            return false;
        }

        if (contract.getDomain() == null || contract.getDomain().getId() == null) {
            setMessage(context, "domains", "Waarde is verplicht");
            return false;
        }

        return true;
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}