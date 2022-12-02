package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Category;

public class PutCategoryValidatorImpl  implements ConstraintValidator<PutCategoryValidator, Category> {
    @Override
    public void initialize(PutCategoryValidator postMainCategory) {
    }

    @Override
    public boolean isValid(Category category, ConstraintValidatorContext context) {
        if (category.getId() == null) {
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
