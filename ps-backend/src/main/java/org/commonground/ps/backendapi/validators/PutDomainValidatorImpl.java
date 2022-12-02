package org.commonground.ps.backendapi.validators;

import java.util.Optional;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.model.Domain;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

public class PutDomainValidatorImpl  implements ConstraintValidator<PutDomainValidator, Domain> {
    @Autowired
    private DomainRepository domainRepository;

    @Override
    public void initialize(PutDomainValidator postCompany) {
    }

    @Override
    public boolean isValid(Domain domain, ConstraintValidatorContext context) {
        UserPrincipal userPrincipal = (UserPrincipal)SecurityContextHolder.getContext().getAuthentication();

        if (domain.getId() == null) {
            setMessage(context, "id", "Waarde mag niet leeg zijn");
            return false;
        }

        if (domain.getDomainType() == null) {
            setMessage(context, "domainType", "Waarde is verplicht");
            return false;
        }

        Optional<DomainEntity> domainEntity = domainRepository.getDomainById(domain.getId(), userPrincipal.getPrincipal());
        if (domainEntity.isEmpty()) {
            setMessage(context, "id", "Niet gevonden");
            return false;
        }

        if(!ConfigService.isValidDomain(domain.getDomain())) {
            setMessage(context, "domain",  "Domeinnaam afgekeurd");
            return false;
        }

        if (!domain.getName().equalsIgnoreCase(domainEntity.get().getName())) {
            Optional<DomainEntity> nameUniqueValidator = domainRepository.getDomainByName(domain.getName());
            if (nameUniqueValidator.isPresent()) {
                setMessage(context, "naem",  "Waarde is niet uniek");
                return false;
            }
        }

        if (!domain.getDomain().equalsIgnoreCase(domainEntity.get().getDomain())) {
            Optional<DomainEntity> domainUniqueValidator = domainRepository.getDomainByDomain(domain.getDomain());
            if (domainUniqueValidator.isPresent()) {
                setMessage(context, "domain",  "Waarde is niet uniek");
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
