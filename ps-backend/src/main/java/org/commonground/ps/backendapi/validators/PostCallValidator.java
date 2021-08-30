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

import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.model.Call;

import org.springframework.beans.factory.annotation.Autowired;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PostCallValidator.Validator.class })
public @interface PostCallValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PostCallValidator, Call> {
		@Autowired
		private CompanyRepository companyRepository;

		@Override
		public void initialize(PostCallValidator postCall) {
		}

		@Override
		public boolean isValid(Call call, ConstraintValidatorContext context) {
			
			if (call.getId() != null) {
				setMessage(context, "id", "Waarde moet leeg zijn");
				return false;
			}

			if (call.getLocation() == null) {
				setMessage(context, "location", "Locatie is verplicht");
				return false;
			}

			if (call.getMainCategory() == null) {
				setMessage(context, "mainCategory", "Hoofdcategorie is verplicht");
				return false;
			}

			if (call.getMainCategory().getId() == null) {
				setMessage(context, "mainCategory.id", "Waarde is verplicht");
				return false;
			}

			if (call.getMainCategory().getCategory() == null) {
				setMessage(context, "category", "Categorie is verplicht");
				return false;
			}

			if (call.getMainCategory().getCategory().getId() == null) {
				setMessage(context, "category.id", "Waarde is verplicht");
				return false;
			}

			if (call.getPerson() != null) {
				if (
					(call.getPerson().getPhone() == null || call.getPerson().getPhone().isEmpty())
					&& (call.getPerson().getEmail() == null || call.getPerson().getEmail().isEmpty())) {
						setMessage(context, "person.email", "Email of een telefoon is verplicht");
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