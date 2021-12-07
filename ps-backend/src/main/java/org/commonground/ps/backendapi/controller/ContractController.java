package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.core.security.SecureHash;
import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.jpa.repositories.RolesRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.UserExtended;
import org.commonground.ps.backendapi.model.constants.DomainType;
import org.commonground.ps.backendapi.validators.PostUserValidator;
import org.commonground.ps.backendapi.validators.PutUserValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/contract", produces = { "application/json; charset=utf-8" })
public class ContractController extends Controller {
	
	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private ContractRepository contractRepository;

	@Secured(identifier = "getContacts")
	@GetMapping()
	public List<Contract> getContacts(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {
		isValid(companyId, domainId);

		List<Contract> contracts = new ArrayList<>();

		Optional<DomainEntity> domainEntityOptional = domainRepository.getDomainById(domainId);
		if (domainEntityOptional.isPresent()) {
			DomainEntity domainEntity = domainEntityOptional.get();
			if (domainEntity.getDomainType().getId() == DomainType.GOVERNMENT.id) {
				List<ContractEntity> contractEntities = contractRepository.getContractByGovernmentDomainId(domainEntity.getId());
				for (ContractEntity contractEntity:  contractEntities) {
					Contract contract = new Contract();
					contract.setId(contractEntity.getId());
					contract.setAccepted(contractEntity.getAccepted());
					contract.setDateCreated(contractEntity.getDateCreated());
					contract.setDomain(Convert.domainEntity(contractEntity.getDomainContractor()));
					contracts.add(contract);
				}
				
			} else if (domainEntity.getDomainType().getId() == DomainType.CONTRACTOR.id) {
			}
		}

		return contracts;
	}

}
