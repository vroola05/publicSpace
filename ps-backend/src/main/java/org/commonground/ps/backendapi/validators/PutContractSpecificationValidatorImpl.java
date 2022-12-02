package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.ContractSpecification;

public class PutContractSpecificationValidatorImpl  implements ConstraintValidator<PutContractSpecificationValidator, ContractSpecification> {

    @Override
    public void initialize(PutContractSpecificationValidator putContractSpecificationValidator) {
    }

    @Override
    public boolean isValid(ContractSpecification contractSpecification, ConstraintValidatorContext context) {
        
        if (contractSpecification.getId() == null) {
            setMessage(context, "id", "Waarde is verplicht");
            return false;
        }

        if (contractSpecification.getDescription() == null || contractSpecification.getDescription().isBlank()) {
            setMessage(context, "description", "Waarde is verplicht");
            return false;
        }

        if (contractSpecification.getDateStart() == null) {
            setMessage(context, "startDate", "Waarde is verplicht");
            return false;
        }

        return true;
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}
