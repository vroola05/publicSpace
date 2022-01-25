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
import java.util.List;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Order;


@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PostOrderValidator.Validator.class })
public @interface PostOrderValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PostOrderValidator, List<Order>> {
		@Override
		public void initialize(PostOrderValidator postCall) {
		}

		@Override
		public boolean isValid(List<Order> orders, ConstraintValidatorContext context) {

			if (orders == null || orders.isEmpty()) {
				setMessage(context, "orders", "Er zijn geen opdrachten");
				return false;	
			}

			for (Order order : orders) {
				if (order.getId() != null) {
					setMessage(context, "id", "Waarde moet leeg zijn");
					return false;
				}
			}

			return true;
		}

		public void setMessage(ConstraintValidatorContext context, String name, String message) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
		}
	}
}