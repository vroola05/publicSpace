package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.repositories.CallListRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderListRepository;
import org.commonground.ps.backendapi.jpa.repositories.builder.ListBuilder;
import org.commonground.ps.backendapi.model.CallList;
import org.commonground.ps.backendapi.model.OrderList;
import org.commonground.ps.backendapi.model.PageOverviewImpl;
import org.commonground.ps.backendapi.model.PageOverviewTemplate;
import org.commonground.ps.backendapi.model.QueryParameters;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilter;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterOperator;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterType;
import org.commonground.ps.backendapi.model.QueryParametersFilterValue;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.PageTypesEnum;
import org.commonground.ps.backendapi.model.template.Template;
import org.commonground.ps.backendapi.validators.QueryParametersValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/list", produces = { "application/json; charset=utf-8" })
public class ListController extends Controller {
	@Autowired
	private CallListRepository callListRepository;

	@Autowired
	ActionService actionService;

	@Autowired
	private OrderListRepository orderListRepository;

	@PersistenceContext
	private EntityManager entityManager;
	
	@Secured(identifier = "getListCall")
	@PostMapping(value = "/call/{id}", consumes = "application/json", produces = "application/json")
	public List<CallList> getListCall(@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @QueryParametersValidator @RequestBody QueryParameters queryParameters) {
		ListBuilder<CallList> listBuilder = getListBuilder(id, queryParameters);

		org.springframework.data.domain.Page<CallList> v = callListRepository.findAll(
			listBuilder.build(),
			listBuilder.getPage(
				queryParameters.getOffset(),
				queryParameters.getSize() <= 0 ? 50 : queryParameters.getSize()));
		return v.getContent();
	}

	@Secured(identifier = "getListOrder")
	@PostMapping(value = "order/{id}", consumes = "application/json", produces = "application/json")
	public List<OrderList> getListOrder(@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @QueryParametersValidator @RequestBody QueryParameters queryParameters) {
		ListBuilder<OrderList> listBuilder = getListBuilder(id, queryParameters);
		
		org.springframework.data.domain.Page<OrderList> v = orderListRepository.findAll(
			listBuilder.build(),
			listBuilder.getPage(
				queryParameters.getOffset(),
				queryParameters.getSize() <= 0 ? 50 : queryParameters.getSize()));
		return v.getContent();
	}

	public <T> ListBuilder<T> getListBuilder(Long id, QueryParameters queryParameters) {
		User user = getUser();
		Template domainT = getTemplate();
		PageOverviewImpl pageOverwiew = (PageOverviewImpl)domainT.getPages().get(PageTypesEnum.OVERVIEW.name);
		Optional<PageOverviewTemplate> pageOverviewTemplateOptional = pageOverwiew.getPageOverviewTemplate().stream().filter(t -> t.getId() == id).findFirst();
		if (!pageOverviewTemplateOptional.isPresent()) {
			throw new BadRequestException();
		}
		PageOverviewTemplate pageOverviewTemplate = pageOverviewTemplateOptional.get();

		ListBuilder<T> listBuilder = new ListBuilder<>();

		// Attach the domain
		listBuilder.with(new QueryParametersFieldFilter("domainId", QueryParametersFieldFilterType.NUMBER, QueryParametersFieldFilterOperator.EQUAL, new QueryParametersFilterValue(user.getDomain().getId())));

		if (pageOverviewTemplate.isPersonal()) {
			listBuilder.with(new QueryParametersFieldFilter("userId", QueryParametersFieldFilterType.NUMBER, QueryParametersFieldFilterOperator.EQUAL, new QueryParametersFilterValue(user.getId())));
		}

		// Check for priority
		if (pageOverviewTemplate.isPriority()) {
			listBuilder.sortBy("priority", Sort.Direction.DESC);
		}

		listBuilder.sortBy("dateCreated", Sort.Direction.DESC);

		// Attach stattusses
		List<QueryParametersFilterValue> statusList = new ArrayList<QueryParametersFilterValue>();
		pageOverviewTemplate.getStatusses().forEach(status -> {
			statusList.add(new QueryParametersFilterValue(status.getId()));
		});
		listBuilder.with(new QueryParametersFieldFilter("statusId", QueryParametersFieldFilterType.NUMBER, statusList));

		// Attach stattusses
		List<QueryParametersFilterValue> groupList = new ArrayList<QueryParametersFilterValue>();
		user.getGroups().forEach(group -> {
			groupList.add(new QueryParametersFilterValue(group.getId()));
		});
	
		listBuilder.with(new QueryParametersFieldFilter("groupId", QueryParametersFieldFilterType.NUMBER, groupList));

		// Add additional filters
		List<QueryParametersFieldFilter> filters = queryParameters.getFilters();
		if (filters != null) {
			for (QueryParametersFieldFilter filter: filters) {
				listBuilder.with(filter);
			}
		}
		return listBuilder;
	}
}
