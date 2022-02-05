package org.commonground.ps.backendapi.controller;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.core.ActionService;
import org.commonground.ps.backendapi.core.ContractService;
import org.commonground.ps.backendapi.core.OrderService;
import org.commonground.ps.backendapi.core.security.Secured;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.ContractRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/order", produces = { "application/json; charset=utf-8" })
public class OrderController extends Controller {

	@Autowired
	private OrderService orderService;
	
	@Secured(identifier = "getCallByOrderId", domainType = DomainTypeEnum.CONTRACTOR)
	@GetMapping("/{id}")
	public Call getCallByOrderId(@PathVariable long id) {
		Optional<Call> callOptional = orderService.getCallByOrderId(getUser(), id);
		if (callOptional.isEmpty()) {
			throw new NotFoundException();
		}

		return callOptional.get();
	}
}
