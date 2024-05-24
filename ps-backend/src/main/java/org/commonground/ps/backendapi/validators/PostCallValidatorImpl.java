package org.commonground.ps.backendapi.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.model.Call;

public class PostCallValidatorImpl implements ConstraintValidator<PostCallValidator, Call> {
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
