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

import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.model.Domain;
import org.commonground.ps.backendapi.model.Group;
import org.springframework.beans.factory.annotation.Autowired;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PostGroupValidator.Validator.class })
public @interface PostGroupValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PostGroupValidator, Group> {
		@Override
		public void initialize(PostGroupValidator postCompany) {
		}

		@Override
		public boolean isValid(Group group, ConstraintValidatorContext context) {
			
			if (group.getId() != null) {
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