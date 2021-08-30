package org.commonground.ps.backendapi.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.CallList;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilter;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterOperator;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterType;
import org.commonground.ps.backendapi.model.QueryParametersFilterValue;
import org.commonground.ps.backendapi.model.QueryParameters;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.template.DomainT;
import org.commonground.ps.backendapi.model.template.StatusT;
import org.commonground.ps.backendapi.util.ActionEnum;
import org.commonground.ps.backendapi.validators.PostCallValidator;
import org.commonground.ps.backendapi.validators.QueryParametersValidator;
import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.entities.LocationEntity;
import org.commonground.ps.backendapi.jpa.entities.PersonEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallListRepository;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.CompanyRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.jpa.repositories.builder.CallListBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	ActionService actionService;


	@Secured(identifier = "getCallList")
	@PostMapping(value = "/list/{type}", consumes = "application/json", produces = "application/json")
	public List<CallList> all(@PathVariable @NotNull(message = "Waarde is verplicht") String type,
		@Valid @QueryParametersValidator @RequestBody QueryParameters queryParameters) {
		User user = getUser();
		DomainT domainT = getDomain();

		CallListBuilder cb = new CallListBuilder();

		cb.with(new QueryParametersFieldFilter("companyId", QueryParametersFieldFilterType.NUMBER, QueryParametersFieldFilterOperator.EQUAL, new QueryParametersFilterValue(user.getCompany().getId())));

		Optional<StatusT> status = domainT.getInfo().getStatusses().stream().filter(s -> s.getPath().equals(type)).findFirst();
		if (status.isPresent()) {
			cb.sortBy("priority", Sort.Direction.DESC);
			cb.with(new QueryParametersFieldFilter("statusId", QueryParametersFieldFilterType.NUMBER, QueryParametersFieldFilterOperator.EQUAL, new QueryParametersFilterValue(status.get().getId())));
		}

		cb.sortBy("dateCreated", Sort.Direction.DESC);

		List<QueryParametersFieldFilter> filters = queryParameters.getFilters();
		if (filters != null) {
			for (QueryParametersFieldFilter filter: filters) {
				cb.with(filter);
			}
		}

		Page<CallList> v = callListRepository.findAll(cb.build(), cb.getPage(queryParameters.getOffset(), queryParameters.getSize()));
		return v.getContent();
	}


	@Secured(identifier = "getCallById")
	@GetMapping("/{id}")
	public Call getCallById(@PathVariable long id) {
		User user = getUser();
		Optional<CallEntity> result = callRepository.getCallById(id, user);
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
		return convertCallEntity(callRepository.saveAndFlush(callEntity));
	}

	public CallEntity convertCall(Call call) throws BadRequestException {
		User user = getUser();

		Action action = actionService.get(user.getDomain().getId(), ActionEnum.CALL_CREATE);
		if (action.getStatus() == null) {
			throw new BadRequestException();
		}

		Optional<StatusEntity> statusEntity = statusRepository.getStatusById(action.getStatus().getId(), user);

		Optional<CompanyEntity> companyEntity = companyRepository.findById(user.getCompany().getId());
		Optional<CategoryEntity> categoryEntity = categoryRepository.getCategory(call.getMainCategory().getCategory().getId(), user);
		if (statusEntity.isPresent() && companyEntity.isPresent() && categoryEntity.isPresent()) {
			CallEntity callEntity = Convert.call(call);
			callEntity.setCompany(companyEntity.get());
			callEntity.setCategory(categoryEntity.get());
			callEntity.setStatus(statusEntity.get());
			
			System.out.println(categoryEntity.get().getGroup().getName());
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
}
