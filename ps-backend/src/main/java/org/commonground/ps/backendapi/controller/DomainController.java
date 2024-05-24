package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainTypeEntity;
import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainTypeRepository;
import org.commonground.ps.backendapi.model.Domain;
import org.commonground.ps.backendapi.model.DomainType;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.commonground.ps.backendapi.validators.PostDomainValidator;
import org.commonground.ps.backendapi.validators.PutDomainValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/company/{companyId}/domain", produces = { "application/json; charset=utf-8" })
public class DomainController extends Controller {

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private DomainTypeRepository domainTypeRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Secured(identifier = "getDomain")
	@GetMapping()
	public List<Domain> getDomain(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId) {

		isValid(companyId);

		User user = getUser();
		List<Domain> domains = new ArrayList<Domain>();
		List<DomainEntity> domainEntities;
		if (user.isAdmin()) {
			domainEntities = domainRepository.getDomains(companyId);
			domainEntities.forEach(domainEntity -> {
				domains.add(Convert.domainEntity(domainEntity));
			});
		} else {
			Optional<DomainEntity> domainEntityOptional = domainRepository.getDomainById(user.getDomain().getId(), user);
			if (domainEntityOptional.isPresent()) {
				domains.add(Convert.domainEntity(domainEntityOptional.get()));
			}
		}		
		return domains;
	}

	@Secured(identifier = "getDomainContractors", domainType = DomainTypeEnum.GOVERNMENT)
	@GetMapping(value = "/{domainId}/contractor/domain")
	public List<Domain> getDomainContractors(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);

		List<Domain> domains = new ArrayList<Domain>();
		List<DomainEntity> domainEntities = domainRepository.getDomainsByDomainType(DomainTypeEnum.CONTRACTOR);
		domainEntities.forEach(domainEntity -> {
			Domain domain = Convert.domainEntity(domainEntity);
			domain.setCompany(Convert.companyEntity(domainEntity.getCompany()));
			domains.add(domain);
		});
		return domains;
	}

	@Secured(identifier = "getDomainType")
	@GetMapping(value = "/type")
	public List<DomainType> getDomainTypes(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId) {

		isValid(companyId);

		List<DomainType> domainTypes = new ArrayList<>();
		List<DomainTypeEntity> domainTypeEntities = domainTypeRepository.findAll();
		domainTypeEntities.forEach(domainTypeEntity -> {
			domainTypes.add(Convert.domainTypeEntity(domainTypeEntity));
		});
		return domainTypes;
	}

	@Secured(admin = true)
	@PostMapping(consumes = "application/json")
	public Domain postDomain(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@Valid @PostDomainValidator @RequestBody Domain domain) {

		isValid(companyId);

		Optional<CompanyEntity> companyEntity = companyRepository.findById(companyId);
		if (companyEntity.isPresent()) {
			DomainEntity domainEntity = Convert.domain(domain);
			domainEntity.setDomainType(getDomainType(domain.getDomainType().getId()));
			domainEntity.setCompany(companyEntity.get());
			return Convert.domainEntity(domainRepository.saveAndFlush(domainEntity));
		}
		return null;
	}

	@Secured(identifier = "putDomain")
	@PutMapping(value = "/{id}", consumes = "application/json")
	public Domain putDomain(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutDomainValidator @RequestBody Domain domain) throws BadRequestException {

		isValid(companyId, id);

		Optional<DomainEntity> optionalDomainEntity = domainRepository.getDomainById(id, getUser());
		if (optionalDomainEntity.isPresent() && id == domain.getId()) {
			DomainEntity domainEntity = optionalDomainEntity.get();
			domainEntity.setName(domain.getName());
			domainEntity.setDomain(domain.getDomain());
			
			return Convert.domainEntity(domainRepository.save(domainEntity));
		}
		throw new BadRequestException();
	}

	public DomainTypeEntity getDomainType(Long id) throws BadRequestException {
		Optional<DomainTypeEntity> optionalDomainTypeEntity = domainTypeRepository.findById(id);
		if (optionalDomainTypeEntity.isPresent()) {
			return optionalDomainTypeEntity.get();
		} 
		throw new BadRequestException();
	}
}
