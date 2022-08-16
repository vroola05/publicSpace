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

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.commonground.ps.backendapi.model.ContractSpecification;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PostContractSpecificationValidator.Validator.class })
public @interface PostContractSpecificationValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PostContractSpecificationValidator, ContractSpecification> {

		@Override
		public void initialize(PostContractSpecificationValidator postContractSpecificationValidator) {
		}

		@Override
		public boolean isValid(ContractSpecification contractSpecification, ConstraintValidatorContext context) {
			
			if (contractSpecification.getId() != null) {
				setMessage(context, "id", "Waarde moet leeg zijn");
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
}