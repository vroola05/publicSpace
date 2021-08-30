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

import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PutUserValidator.Validator.class })
public @interface PutUserValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PutUserValidator, User> {
		@Autowired
		private UserRepository userRepository;

		@Override
		public void initialize(PutUserValidator putUser) {
		}

		@Override
		public boolean isValid(User user, ConstraintValidatorContext context) {
			
			if (user.getId() == null) {
				setMessage(context, "id", "Waarde is verplicht");
				return false;
			}

			Optional<UserEntity> nameUniqueValidator = userRepository.getUserByName(user.getName());
			if (nameUniqueValidator.isPresent() && nameUniqueValidator.get().getId() != user.getId()) {
				setMessage(context, "name",  "Er is al een gebruiker met deze naam.");
				return false;
			}

			Optional<UserEntity> usernameUniqueValidator = userRepository.getUserByUsername(user.getUsername());
			if (usernameUniqueValidator.isPresent() && usernameUniqueValidator.get().getId() != user.getId()) {
				setMessage(context, "username",  "Er is al een gebruiker met deze gebruikersnaam.");
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