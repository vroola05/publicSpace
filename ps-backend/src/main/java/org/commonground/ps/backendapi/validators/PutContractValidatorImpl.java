package org.commonground.ps.backendapi.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Contract;

public class PutContractValidatorImpl  implements ConstraintValidator<PutContractValidator, Contract> {

    @Override
    public void initialize(PutContractValidator postContract) {
    }

    @Override
    public boolean isValid(Contract contract, ConstraintValidatorContext context) {
        if (contract.getId() == null) {
            setMessage(context, "id", "Waarde is verplicht");
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
