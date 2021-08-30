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
import org.commonground.ps.backendapi.model.UserExtended;
import org.springframework.beans.factory.annotation.Autowired;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PostUserValidator.Validator.class })
public @interface PostUserValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PostUserValidator, UserExtended> {
		@Autowired
		private UserRepository userRepository;

		@Override
		public void initialize(PostUserValidator postUser) {
		}

		@Override
		public boolean isValid(UserExtended user, ConstraintValidatorContext context) {
			if (user.getId() != null) {
				setMessage(context, "id", "Waarde moet leeg zijn");
				return false;
			}

			if (user.getPassword() == null || user.getRePassword() == null) {
				setMessage(context, "password",  "Wachtwoorden zijn leeg!");
				return false;
			}

			if (!user.getPassword().equals(user.getRePassword())) {
				setMessage(context, "password",  "Wachtwoorden zijn niet gelijk!");
				return false;
			}

			if (!checkPasswordComplexity(user.getPassword())) {
				setMessage(context, "password",  "Wachtwoord niet sterk genoeg! Het wachtwoord moet minimaal 8 tekens groot zijn. Er moet minimaal één hoofletter, één letter, één cijfer en een speciaal teken in zitten.");
				return false;
			}

			Optional<UserEntity> nameUniqueValidator = userRepository.getUserByName(user.getName());
			if (nameUniqueValidator.isPresent()) {
				setMessage(context, "name",  "Er is al een gebruiker met deze naam.");
				return false;
			}

			Optional<UserEntity> usernameUniqueValidator = userRepository.getUserByUsername(user.getUsername());
			if (usernameUniqueValidator.isPresent()) {
				setMessage(context, "username",  "Er is al een gebruiker met deze gebruikersnaam.");
				return false;
			}
			return true;
		}

		public static boolean checkPasswordComplexity(String password) {
			if (password == null || password.length() < 8) {
				return false;
			}

			int complexity = 0;
			if (password.matches(".*[0-9].*")) {
				complexity++;
			}
			if (password.matches(".*[a-z].*")) {
				complexity++;
			}
			if (password.matches(".*[A-Z].*")) {
				complexity++;
			}
			if (password.matches(".*\\W.*")) {
				complexity++;
			}
			return complexity >= 4;
		}

		public void setMessage(ConstraintValidatorContext context, String name, String message) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
		}
	}
}