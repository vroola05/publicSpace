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

import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.model.Company;
import org.springframework.beans.factory.annotation.Autowired;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PutCompanyValidator.Validator.class })
public @interface PutCompanyValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<PutCompanyValidator, Company> {
		@Autowired
		private CompanyRepository companyRepository;

		@Override
		public void initialize(PutCompanyValidator postCompany) {
		}

		@Override
		public boolean isValid(Company company, ConstraintValidatorContext context) {
			if (company.getId() == null) {
				setMessage(context, "id", "Waarde mag niet leeg zijn");
				return false;
			}

			Optional<CompanyEntity> companyEntity = companyRepository.findById(company.getId());
			if (companyEntity.isEmpty()) {
				setMessage(context, "id", "Niet gevonden");
				return false;
			}

			if (!company.getName().equalsIgnoreCase(companyEntity.get().getName())) {
				Optional<CompanyEntity> domainUniqueValidator = companyRepository.getCompanyByName(company.getName());
				if (domainUniqueValidator.isPresent()) {
					setMessage(context, "name",  "Waarde is niet uniek");
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