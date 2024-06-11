package org.commonground.ps.backendapi.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.ContractService;
import org.commonground.ps.backendapi.core.ContractSpecificationService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.ContractSpecification;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.commonground.ps.backendapi.validators.PostContractSpecificationValidator;
import org.commonground.ps.backendapi.validators.PostContractValidator;
import org.commonground.ps.backendapi.validators.PutContractSpecificationValidator;
import org.commonground.ps.backendapi.validators.PutContractValidator;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/contract", produces = { "application/json; charset=utf-8" })
public class ContractController extends Controller {
	
	private final ContractService contractService;
	private final ContractSpecificationService contractSpecificationService;
	
	public ContractController(
		ContractService contractService,
		ContractSpecificationService contractSpecificationService) {
		this.contractService = contractService;
		this.contractSpecificationService = contractSpecificationService;

	}

	@Secured(identifier = "getContracts")
	@GetMapping()
	public List<Contract> getContracts(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {
		isValid(companyId, domainId);

		return contractService.getContracts(domainId);
	}

	@Secured(identifier = "getContractById")
	@GetMapping(value = "/{id}")
	public Contract getContractById(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long id) {
		isValid(companyId, domainId);

		return contractService.getContract(domainId, id);
	}

	@Secured(identifier = "postContract", domainType = DomainTypeEnum.GOVERNMENT)
	@PostMapping(consumes = "application/json")
	public Contract postContract(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@Valid @PostContractValidator @RequestBody Contract contract) throws BadRequestException {

		isValid(companyId, domainId);

		if (contractService.getContractBy(domainId, contract.getDomain().getId()).isPresent()) {
			BadRequestException badRequestException = new BadRequestException();
			badRequestException.addError(new FieldValue("domains", "Waarde is niet uniek"));
			throw badRequestException;
		}

		return contractService.save(domainId, contract);
	}

	@Secured(identifier = "putContract", domainType = DomainTypeEnum.CONTRACTOR)
	@PutMapping(value = "/{id}", consumes = "application/json")
	public Contract putContract(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PutContractValidator @RequestBody Contract contract) throws BadRequestException {

		isValid(companyId, domainId);

		return contractService.update(domainId, id, contract);
	}

	@Secured(identifier = "deleteContract", domainType = DomainTypeEnum.GOVERNMENT)
	@DeleteMapping(value = "/{id}", consumes = "application/json")
	public boolean deleteContract(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id) throws BadRequestException {

		isValid(companyId, domainId);

		return contractService.delete(domainId, id);
	}

	@Secured(identifier = "getContractSpecificationByContractId")
	@GetMapping(value = "/{id}/specification")
	public List<ContractSpecification> getContractSpecificationByContractId(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long id) {
		isValid(companyId, domainId);

		return contractSpecificationService.getContractSpecifications(domainId, id);
	}

	@Secured(identifier = "postContractSpecification", domainType = DomainTypeEnum.CONTRACTOR)
	@PostMapping(value = "/{id}/specification", consumes = "application/json")
	public ContractSpecification postContractSpecification(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@Valid @PostContractSpecificationValidator @RequestBody ContractSpecification contractSpecification) throws BadRequestException {

		isValid(companyId, domainId);
		Contract contract = contractService.getContract(domainId, id);
		if (contract == null) {
			BadRequestException badRequestException = new BadRequestException();
			badRequestException.addError(new FieldValue("domains", "Waarde is niet uniek"));
			throw badRequestException;
		}

		return contractSpecificationService.saveContractSpecification(domainId, id, contractSpecification);
	}

	@Secured(identifier = "putContractSpecification", domainType = DomainTypeEnum.CONTRACTOR)
	@PostMapping(value = "/{id}/specification/{contractSpecificationId}", consumes = "application/json")
	public ContractSpecification putContractSpecification(
		@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
		@PathVariable @NotNull(message = "Waarde is verplicht") Long contractSpecificationId,
		@Valid @PutContractSpecificationValidator @RequestBody ContractSpecification contractSpecification) throws BadRequestException {

		isValid(companyId, domainId);
		Contract contract = contractService.getContract(domainId, id);
		if (contract == null) {
			BadRequestException badRequestException = new BadRequestException();
			badRequestException.addError(new FieldValue("domains", "Waarde is niet uniek"));
			throw badRequestException;
		}

		return contractSpecificationService.updateContractSpecification(domainId, id, contractSpecificationId, contractSpecification);
	}

}
