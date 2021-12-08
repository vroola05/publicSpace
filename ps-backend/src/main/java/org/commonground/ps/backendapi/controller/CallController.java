package org.commonground.ps.backendapi.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.CallList;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilter;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterOperator;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterType;
import org.commonground.ps.backendapi.model.QueryParametersFilterValue;
import org.commonground.ps.backendapi.model.QueryParameters;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.PageTypesEnum;
import org.commonground.ps.backendapi.model.template.Template;
import org.commonground.ps.backendapi.model.PageOverviewImpl;
import org.commonground.ps.backendapi.model.PageOverviewTemplate;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.commonground.ps.backendapi.validators.PostCallValidator;
import org.commonground.ps.backendapi.validators.PutCallGroupValidator;
import org.commonground.ps.backendapi.validators.PutCallUserValidator;
import org.commonground.ps.backendapi.validators.QueryParametersValidator;
import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.LocationEntity;
import org.commonground.ps.backendapi.jpa.entities.PersonEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallListRepository;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.jpa.repositories.builder.CallListBuilder;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;

@Validated
@RestController
@RequestMapping(value = "/call", produces = { "application/json; charset=utf-8" })
public class CallController extends Controller {
	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private CallRepository callRepository;

	@Autowired
	private StatusRepository statusRepository;

	@Autowired
	private CallListRepository callListRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	ActionService actionService;


	@Secured(identifier = "getCallList")
	@PostMapping(value = "/list/{id}", consumes = "application/json", produces = "application/json")
	public List<CallList> all(@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @QueryParametersValidator @RequestBody QueryParameters queryParameters) {
		User user = getUser();
		Template domainT = getTemplate();
		PageOverviewImpl pageOverwiew = (PageOverviewImpl)domainT.getPages().get(PageTypesEnum.OVERVIEW.name);
		Optional<PageOverviewTemplate> pageOverviewTemplateOptional = pageOverwiew.getPageOverviewTemplate().stream().filter(t -> t.getId() == id).findFirst();
		if (!pageOverviewTemplateOptional.isPresent()) {
			throw new BadRequestException();
		}
		PageOverviewTemplate pageOverviewTemplate = pageOverviewTemplateOptional.get();

		CallListBuilder cb = new CallListBuilder();

		// Attach the company
		cb.with(new QueryParametersFieldFilter("companyId", QueryParametersFieldFilterType.NUMBER, QueryParametersFieldFilterOperator.EQUAL, new QueryParametersFilterValue(user.getCompany().getId())));

		if (pageOverviewTemplate.isPersonal()) {
			cb.with(new QueryParametersFieldFilter("userId", QueryParametersFieldFilterType.NUMBER, QueryParametersFieldFilterOperator.EQUAL, new QueryParametersFilterValue(user.getId())));
		}

		// Check for priority
		if (pageOverviewTemplate.isPriority()) {
			cb.sortBy("priority", Sort.Direction.DESC);
		}

		cb.sortBy("dateCreated", Sort.Direction.DESC);

		// Attach stattusses
		List<QueryParametersFilterValue> statusList = new ArrayList<QueryParametersFilterValue>();
		pageOverviewTemplate.getStatusses().forEach(status -> {
			statusList.add(new QueryParametersFilterValue(status.getId()));
		});
		cb.with(new QueryParametersFieldFilter("statusId", QueryParametersFieldFilterType.NUMBER, statusList));

		// Add additional filters
		List<QueryParametersFieldFilter> filters = queryParameters.getFilters();
		if (filters != null) {
			for (QueryParametersFieldFilter filter: filters) {
				cb.with(filter);
			}
		}
		
		org.springframework.data.domain.Page<CallList> v = callListRepository.findAll(cb.build(), cb.getPage(queryParameters.getOffset(), queryParameters.getSize() <= 0 ? 50 : queryParameters.getSize()));
		return v.getContent();
	}

	@Secured(identifier = "getCallById")
	@GetMapping("/{id}")
	public Call getCallById(@PathVariable long id) {
		User user = getUser();
		Optional<CallEntity> result = callRepository.getCallById(id, user.getCompany().getId());
		if (result.isEmpty()) {
			throw new NotFoundException();
		}

		CallEntity callEntity = result.get();
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

		Action action = actionService.get(user.getDomain().getId(), ActionEnum.CALL_CREATE);
		if (action.getStatus() == null) {
			BadRequestException badRequest = new BadRequestException();
			badRequest.addError(new FieldValue("status", "No status is defined for action"));
			throw badRequest;
		}

		Optional<StatusEntity> statusEntityOptional = statusRepository.getStatusById(action.getStatus().getId(), user);

		Optional<CompanyEntity> companyEntityOptional = companyRepository.findById(user.getCompany().getId());
		Optional<CategoryEntity> categoryEntityOptional = categoryRepository.getCategory(call.getMainCategory().getCategory().getId(), user);
		if (statusEntityOptional.isPresent() && companyEntityOptional.isPresent() && categoryEntityOptional.isPresent()) {
			CallEntity callEntity = Convert.call(call);
			callEntity.setCompany(companyEntityOptional.get());
			callEntity.setCategory(categoryEntityOptional.get());
			// callEntity.setStatus(statusEntityOptional.get());
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

		call.setCompany(Convert.companyEntity(callEntity.getCompany()));
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
		Optional<CallEntity> callOptional = callRepository.getCallById(id, user.getCompany().getId());
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
		Optional<CallEntity> callOptional = callRepository.getCallById(id, user.getCompany().getId());
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
