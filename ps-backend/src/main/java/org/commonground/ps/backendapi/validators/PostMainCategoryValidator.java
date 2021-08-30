package org.commonground.ps.backendapi.validators;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Optional;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.commonground.ps.backendapi.jpa.entities.MainCategoryEntity;
import org.commonground.ps.backendapi.jpa.repositories.MainCategoryRepository;
import org.commonground.ps.backendapi.model.MainCategory;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PostMainCategoryValidator.Validator.class })
public @interface PostMainCategoryValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PostMainCategoryValidator, MainCategory> {
		@Autowired
		private MainCategoryRepository mainCategoryRepository;

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
}