package org.commonground.ps.backendapi.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.MainCategory;

public class PostMainCategoryValidatorImpl implements ConstraintValidator<PostMainCategoryValidator, MainCategory> {
		

    @Override
    public void initialize(PostMainCategoryValidator postMainCategory) {
    }

    @Override
    public boolean isValid(MainCategory mainCategory, ConstraintValidatorContext context) {
        
        if (mainCategory.getId() != null) {
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