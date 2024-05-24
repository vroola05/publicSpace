package org.commonground.ps.backendapi.validators;

import java.util.Optional;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.model.Company;
import org.springframework.beans.factory.annotation.Autowired;

public class PutCompanyValidatorImpl  implements ConstraintValidator<PutCompanyValidator, Company> {
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