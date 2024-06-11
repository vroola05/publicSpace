package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.core.PageService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.entities.PageTypeEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.PageButtonTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.PageRepository;
import org.commonground.ps.backendapi.jpa.repositories.PageTypeRepository;
import org.commonground.ps.backendapi.model.Page;
import org.commonground.ps.backendapi.model.PageImpl;
import org.commonground.ps.backendapi.model.PageOverviewImpl;
import org.commonground.ps.backendapi.model.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Validated
@RestController
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/page", produces = { "application/json; charset=utf-8" })
public class PageController extends Controller {
	private final PageService pageService;
	private final DomainRepository domainRepository;
	private final PageRepository pageRepository;
	private final PageTypeRepository pageTypeRepository;
	private final PageButtonTypeRepository pageButtonTypeRepository;
	private final ConfigService configService;

	public PageController(
		ConfigService configService,
		DomainRepository domainRepository,
		PageButtonTypeRepository pageButtonTypeRepository,
		PageRepository pageRepository,
		PageService pageService,
		PageTypeRepository pageTypeRepository) {
		this.pageService = pageService;
		this.domainRepository = domainRepository;
		this.pageRepository = pageRepository;
		this.pageTypeRepository = pageTypeRepository;
		this.pageButtonTypeRepository = pageButtonTypeRepository;
		this.configService = configService;

	}
	
	@Secured(identifier = "getPages")
	@GetMapping()
	public List<Page> getPages(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);
		synchronizePages(companyId, domainId);

		return pageService.get(companyId, domainId);
	}

	@Secured(identifier = "getButtonTypes")
	@GetMapping(value = "/button/types")
	public List<String> getButtonTypes(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);
		List<PageButtonTypeEntity> pageButtonTypeEntities = pageButtonTypeRepository.findAllByOrderByNameAsc();

		List<String> pageButtonTypes = new ArrayList<>();
		pageButtonTypeEntities.forEach(pageButtonTypeEntity -> {
			pageButtonTypes.add(pageButtonTypeEntity.getName());
		});

		return pageButtonTypes;
	}

	private void synchronizePages(Long companyId, Long domainId) {
		List<PageTypeEntity> pageTypeEntities = pageTypeRepository.findAll();
		List<PageEntity> pageEntities = pageRepository.getPages(domainId);
		if (pageTypeEntities.size() != pageEntities.size()) {
			List<PageTypeEntity> newPageTypes = pageTypeEntities.stream().filter(a -> { return pageEntities.stream().noneMatch(b -> { return b.getPageType().getId() == a.getId(); }); }).collect(Collectors.toList());

			Optional<DomainEntity> optionalDomainEntity = domainRepository.getDomainById(domainId, getUser());
			if (optionalDomainEntity.isPresent()) {
				List<PageEntity> newPageEntities = new ArrayList<>();
				newPageTypes.forEach(pageTypeEntity -> {
					PageEntity pageEntity = new PageEntity();
					pageEntity.setPageType(pageTypeEntity);
					pageEntity.setDomain(optionalDomainEntity.get());
					pageEntity.setName("");
					pageEntity.setLayoutType("page");
					//pageEntity.setPageButtons(null);
					newPageEntities.add(pageEntity);
				});
				pageRepository.saveAll(newPageEntities);
			}
		}
	}


	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/overview", consumes = "application/json")
	public Page putPageOverviewImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageOverviewImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/assign", consumes = "application/json")
	public Page putPageAssignImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/details", consumes = "application/json")
	public Page putPageDetailsImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/newLocation", consumes = "application/json")
	public Page putPageNewLocationImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/newInformation", consumes = "application/json")
	public Page putPageNewInformationImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/newConfirm", consumes = "application/json")
	public Page putPageNewConfirmImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/orderCreation", consumes = "application/json")
	public Page putPageOrderCreationImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/orderConfirm", consumes = "application/json")
	public Page putPageOrderConfirmImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}


	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/orderSpecificationSelect", consumes = "application/json")
	public Page putPageOrderSpecificationSelectImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/orderSpecificationHandle", consumes = "application/json")
	public Page putPageOrderSpecificationHandleImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	@Secured(identifier = "putPage")
	@PutMapping(value = "/{pageId}/orderSpecificationConfirmation", consumes = "application/json")
	public Page putPageOrderSpecificationConfirmationImpl(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long pageId,
		@Valid @RequestBody PageImpl page) throws BadRequestException {
		return putPage(companyId, domainId, pageId, page);
	}

	public Page putPage(
		Long companyId,
		Long domainId,
		Long pageId,
		Page page
	) throws BadRequestException {
		isValid(companyId, domainId);
		User user = getUser();
		
		Page result = pageService.updatePage(domainId, pageId, page);

		configService.update(user.getDomain().getDomain());
		return result;
	}

	


	
}
