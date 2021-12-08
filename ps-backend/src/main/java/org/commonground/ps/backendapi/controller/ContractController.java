package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
			if (domainEntity.getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
				List<ContractEntity> contractEntities = contractRepository.getContractByGovernmentDomainId(domainEntity.getId());
				for (ContractEntity contractEntity:  contractEntities) {
					Contract contract = new Contract();
					contract.setId(contractEntity.getId());
					contract.setAccepted(contractEntity.getAccepted());
					contract.setDateCreated(contractEntity.getDateCreated());
					contract.setDomain(Convert.domainEntity(contractEntity.getDomainContractor()));
					contracts.add(contract);
				}
				
			} else if (domainEntity.getDomainType().getId() == DomainTypeEnum.CONTRACTOR.id) {
			}
		}

		return contracts;
	}

}
