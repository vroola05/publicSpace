package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.PageRepository;
import org.commonground.ps.backendapi.model.Page;
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
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/page", produces = { "application/json; charset=utf-8" })
public class PageController extends Controller {
	@Autowired
	PageRepository pageRepository;

	@Secured(identifier = "getPages")
	@GetMapping()
	public List<Page> getPages(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {

		isValid(companyId, domainId);

		List<Page> pages = new ArrayList<>();
		List<PageEntity> pageEntities = pageRepository.getPages(domainId);
		pageEntities.forEach(pageEntity -> {
			Page page = Convert.pageEntity(pageEntity);
			pages.add(page);
		});
		return pages;
	}
}
