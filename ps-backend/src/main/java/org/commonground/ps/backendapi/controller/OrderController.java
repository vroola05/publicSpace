package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.MainCategoryRepository;
import org.commonground.ps.backendapi.model.MainCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/order", produces = { "application/json; charset=utf-8" })
public class OrderController extends Controller {
	
	@Autowired
  	private MainCategoryRepository mainCategoryRepository;

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private ContractRepository contractRepository;

	@Secured(identifier = "getContractCategories")
	@GetMapping(value = "/contractor/{contractId}/maincategory")
	public List<MainCategory> getContacts(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long contractId) {
		isValid(companyId, domainId);

		List<MainCategory> mainCategory = new ArrayList<>();
		// mainCategoryRepository.getMainCategoryById(id, domainId)
		

		return mainCategory;
	}

}
