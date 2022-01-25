package org.commonground.ps.backendapi.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.LocationEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.PersonEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.commonground.ps.backendapi.validators.PostCallValidator;
import org.commonground.ps.backendapi.validators.PutCallGroupValidator;
import org.commonground.ps.backendapi.validators.PutCallUserValidator;
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
@RequestMapping(value = "/call", produces = { "application/json; charset=utf-8" })
public class CallController extends Controller {
	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private CallRepository callRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	ActionService actionService;

	@Secured(identifier = "getCallById")
	@GetMapping("/{id}")
	public Call getCallById(@PathVariable long id) {
		User user = getUser();
		Optional<CallEntity> callEntityOptional = callRepository.getCallById(id, user.getDomain().getId());
		if (callEntityOptional.isEmpty()) {
			throw new NotFoundException();
		}

		CallEntity callEntity = callEntityOptional.get();

		return convertCallEntity(callEntity);
	}

	@Secured(identifier = "postCall")
	@PostMapping(consumes = "application/json", produces = "application/json")
	public Call postCall(@Valid @PostCallValidator @RequestBody Call call) throws BadRequestException {
		CallEntity callEntity = convertCall(call);
		callEntity.setDateCreated(new Date());
		callEntity.setCasenumber(getCasenumber());
		CallEntity result = callRepository.saveAndFlush(callEntity);

		actionService.call(getUser().getDomain().getId(), result.getId(), ActionEnum.CALL_CREATE);

		return convertCallEntity(result);
	}

	public CallEntity convertCall(Call call) throws BadRequestException {
		User user = getUser();

		Optional<ActionEntity> actionEntityOptional = actionService.getEntity(user.getDomain().getId(), ActionEnum.CALL_CREATE);
		if (!actionEntityOptional.isPresent() || actionEntityOptional.get().getStatus() == null) {
			BadRequestException badRequest = new BadRequestException();
			badRequest.addError(new FieldValue("status", "No status is defined for action"));
			throw badRequest;
		}

		Optional<DomainEntity> domainEntityOptional = domainRepository.findById(user.getDomain().getId());
		Optional<CategoryEntity> categoryEntityOptional = categoryRepository.getCategory(call.getMainCategory().getCategory().getId(), user);
		if (domainEntityOptional.isPresent() && categoryEntityOptional.isPresent()) {
			CallEntity callEntity = Convert.call(call);
			callEntity.setDomain(domainEntityOptional.get());
			callEntity.setCategory(categoryEntityOptional.get());
			callEntity.setGroup(categoryEntityOptional.get().getGroup());
			
			LocationEntity locationEntity = Convert.location(call.getLocation());
			locationEntity.setCall(callEntity);
			callEntity.setLocation(locationEntity);

			if (call.getPerson() != null) {
				PersonEntity personEntity = Convert.person(call.getPerson());
				personEntity.setCall(callEntity);
				callEntity.setPerson(personEntity);
			}

			return callEntity;
		}

		throw new BadRequestException();
	}

	public Call convertCallEntity(CallEntity callEntity) {
		Call call = Convert.callEntity(callEntity);
		if (callEntity.getLocation() != null) {
			call.setLocation(Convert.locationEntity(callEntity.getLocation()));
		}

		if (callEntity.getPerson() != null) {
			call.setPerson(Convert.personEntity(callEntity.getPerson()));
		}
		
		if (callEntity.getUser() != null) {
			call.setUser(Convert.userEntity(callEntity.getUser()));
		}

		if (callEntity.getGroup() != null) {
			call.setGroup(Convert.groupEntity(callEntity.getGroup()));
		}

		if (callEntity.getCategory() != null) {
			call.setMainCategory(Convert.mainCategoryEntity(callEntity.getCategory().getMainCategory()));
			call.getMainCategory().setCategory(Convert.categoryEntity(callEntity.getCategory()));
		}

		if (callEntity.getStatus() != null) {
			call.setStatus(Convert.statusEntity(callEntity.getStatus()));
		}

		if (callEntity.getOrders() != null && !callEntity.getOrders().isEmpty()) {
			for (OrderEntity orderEntity: callEntity.getOrders()) {
				call.getOrders().add(Convert.orderEntity(orderEntity));
			}
		}

		call.setDomain(Convert.domainEntity(callEntity.getDomain()));
		return call;
	}

	public String getCasenumber(){
		BigDecimal casenumber = callRepository.getNextCasenumber();
		return casenumber.toString();
	}

	@Secured(identifier = "putCallUser")
	@PutMapping(value = "/{id}/user", consumes = "application/json", produces = "application/json")
	public Call putCallUser(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutCallUserValidator @RequestBody User u) throws BadRequestException {

		User user = getUser();
		Optional<CallEntity> callOptional = callRepository.getCallById(id, user.getDomain().getId());
		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), u.getId());

		if (callOptional.isEmpty()) {
			throw new BadRequestException();
		}
		CallEntity callEntity = callOptional.get();

		if (userEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}
		UserEntity userEntity = userEntityOptional.get();

		if(userEntity.getGroups().stream().noneMatch(group -> group.getId() == callEntity.getGroup().getId())) {
			throw new BadRequestException();
		}

		callEntity.setUser(userEntity);

		callRepository.saveAndFlush(callEntity);

		actionService.call(getUser().getDomain().getId(), callEntity.getId(), ActionEnum.ASSIGN_PERSON);

		return convertCallEntity(callEntity);
	}

	@Secured(identifier = "putCallGroup")
	@PutMapping(value = "/{id}/group", consumes = "application/json", produces = "application/json")
	public Call putCallGroup(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutCallGroupValidator @RequestBody Group g) throws BadRequestException {

		User user = getUser();
		Optional<CallEntity> callOptional = callRepository.getCallById(id, user.getDomain().getId());
		Optional<GroupEntity> groupEntityOptional = groupRepository.getGroupById(g.getId(), user.getDomain().getId());

		if (callOptional.isEmpty()) {
			throw new BadRequestException();
		}
		CallEntity callEntity = callOptional.get();

		if (groupEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}
		GroupEntity groupEntity = groupEntityOptional.get();

		callEntity.setGroup(groupEntity);

		callRepository.saveAndFlush(callEntity);

		actionService.call(getUser().getDomain().getId(), callEntity.getId(), ActionEnum.ASSIGN_GROUP);

		return convertCallEntity(callEntity);
	}
}
