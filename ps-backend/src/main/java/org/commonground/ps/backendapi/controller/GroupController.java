package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.security.Secured;
import org.commonground.ps.backendapi.validators.PostGroupValidator;
import org.commonground.ps.backendapi.validators.PutGroupValidator;
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
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/group", produces = {
		"application/json; charset=utf-8" })
public class GroupController extends Controller {

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Secured(identifier = "getGroups")
	@GetMapping()
	public List<Group> getGroups(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);

		List<Group> groups = new ArrayList<>();
		List<GroupEntity> domainEntities = groupRepository.getGroups(domainId);
		domainEntities.forEach(domainEntity -> {
			groups.add(Convert.groupEntity(domainEntity));
		});
		return groups;
	}

	@Secured(identifier = "postGroup")
	@PostMapping(consumes = "application/json")
	public Group postGroup(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@Valid @PostGroupValidator @RequestBody Group group) {

		isValid(companyId, domainId);

		if (groupRepository.getGroupByName(group.getName(), domainId).isPresent()) {
			BadRequestException badRequestException = new BadRequestException();
			badRequestException.addError(new FieldValue("name", "Waarde is niet uniek"));
			throw badRequestException;
		}

		Optional<DomainEntity> domainEntity = domainRepository.getDomainById(domainId, getUser());
		if (domainEntity.isPresent()) {
			GroupEntity groupEntity = Convert.group(group);
			groupEntity.setDomain(domainEntity.get());
			return Convert.groupEntity(groupRepository.saveAndFlush(groupEntity));
		}
		throw new BadRequestException();
	}

	@Secured(identifier = "putGroup")
	@PutMapping(value = "/{id}", consumes = "application/json")
	public Group putGroup(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
			@Valid @PutGroupValidator @RequestBody Group group) throws BadRequestException {

		isValid(companyId, domainId);

		Optional<GroupEntity> optionalGroupEntityName = groupRepository.getGroupByName(group.getName(), domainId);
		if (optionalGroupEntityName.isPresent() && group.getId() != optionalGroupEntityName.get().getId()) {
			BadRequestException badRequestException = new BadRequestException();
			badRequestException.addError(new FieldValue("name", "Waarde is niet uniek"));
			throw badRequestException;
		}

		Optional<GroupEntity> optionalGroupEntity = groupRepository.getGroupById(group.getId(), domainId);
		if (optionalGroupEntity.isPresent() && id == group.getId()) {
			GroupEntity groupEntity = optionalGroupEntity.get();
			groupEntity.setName(group.getName());

			return Convert.groupEntity(groupRepository.save(groupEntity));
		}
		throw new BadRequestException();
	}
}
