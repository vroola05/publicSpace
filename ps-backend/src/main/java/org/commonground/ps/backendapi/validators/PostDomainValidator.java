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
import org.springframework.beans.factory.annotation.Autowired;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PostDomainValidator.Validator.class })
public @interface PostDomainValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PostDomainValidator, Domain> {
		@Autowired
		private DomainRepository domainRepository;

		@Override
		public void initialize(PostDomainValidator postCompany) {
		}

		@Override
		public boolean isValid(Domain domain, ConstraintValidatorContext context) {
			
			if (domain.getId() != null) {
				setMessage(context, "id", "Waarde moet leeg zijn");
				return false;
			}

			if (domain.getDomainType() == null) {
				setMessage(context, "domainType", "Waarde is verplicht");
				return false;
			}

			if(!ConfigService.isValidDomain(domain.getDomain())) {
				setMessage(context, "domain",  "Domeinnaam afgekeurd");
				return false;
			}

			
			Optional<DomainEntity> nameUniqueValidator = domainRepository.getDomainByName(domain.getName());
			if (nameUniqueValidator.isPresent()) {
				setMessage(context, "name",  "Waarde is niet uniek");
				return false;
			}

			Optional<DomainEntity> domainUniqueValidator = domainRepository.getDomainByDomain(domain.getDomain());
			if (domainUniqueValidator.isPresent()) {
				setMessage(context, "domain",  "Waarde is niet uniek");
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