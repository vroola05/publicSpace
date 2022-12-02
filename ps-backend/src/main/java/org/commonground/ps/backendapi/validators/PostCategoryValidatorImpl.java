package org.commonground.ps.backendapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Category;

public class PostCategoryValidatorImpl implements ConstraintValidator<PostCategoryValidator, Category> {
    @Override
    public void initialize(PostCategoryValidator postMainCategory) {
    }

    @Override
    public boolean isValid(Category category, ConstraintValidatorContext context) {
        
        if (category.getId() != null) {
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
