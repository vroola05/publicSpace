package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.MainCategory;

public class PutMainCategoryValidatorImpl  implements ConstraintValidator<PutMainCategoryValidator, MainCategory> {
    @Override
    public void initialize(PutMainCategoryValidator postMainCategory) {
    }

    @Override
    public boolean isValid(MainCategory mainCategory, ConstraintValidatorContext context) {
        
        if (mainCategory.getId() == null) {
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