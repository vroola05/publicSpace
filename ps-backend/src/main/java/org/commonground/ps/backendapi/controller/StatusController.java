package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.model.Status;
import org.commonground.ps.backendapi.validators.PostStatusValidator;
import org.commonground.ps.backendapi.validators.PutStatusValidator;
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
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/status", produces = {
		"application/json; charset=utf-8" })
public class StatusController extends Controller {

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private StatusRepository statusRepository;

	@Secured(identifier = "getStatus")
	@GetMapping()
	public List<Status> getStatus(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);

		List<Status> statusses = new ArrayList<Status>();
		List<StatusEntity> statusEntities = statusRepository.getStatusByDomainId(domainId);
		statusEntities.forEach(statusEntity -> {
			statusses.add(Convert.statusEntity(statusEntity));
		});
		return statusses;
	}

	@Secured(identifier = "postStatus")
	@PostMapping(consumes = "application/json")
	public Status postStatus(@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@Valid @PostStatusValidator @RequestBody Status status) {

		isValid(companyId, domainId);

		Optional<DomainEntity> optionalDomainEntity = domainRepository.findById(domainId);
		if (optionalDomainEntity.isPresent()) {
			StatusEntity statusEntity = Convert.status(status);
			statusEntity.setDomain(optionalDomainEntity.get());
			return Convert.statusEntity(statusRepository.saveAndFlush(statusEntity));
		}
		throw new BadRequestException();
	}

	@Secured(identifier = "putStatus")
	@PutMapping(value = "/{statusId}", consumes = "application/json", produces = "application/json")
	public Status putStatus(@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long statusId,
			@Valid @PutStatusValidator @RequestBody Status status) {

		isValid(companyId, domainId);

		if (statusId == status.getId()) {
			Optional<StatusEntity> optionalStatusEntity = statusRepository.findById(statusId);
			if (optionalStatusEntity.isPresent()) {
				StatusEntity statusEntity = optionalStatusEntity.get();

				statusEntity.setName(status.getName());

				return Convert.statusEntity(statusRepository.saveAndFlush(statusEntity));
			}
		}
		throw new BadRequestException();
	}
}
