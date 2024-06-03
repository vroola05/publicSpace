package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.commonground.ps.backendapi.jpa.repositories.RolesRepository;
import org.commonground.ps.backendapi.model.Role;
import org.commonground.ps.backendapi.security.Secured;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/roles", produces = { "application/json; charset=utf-8" })
public class RolesController extends Controller {

	@Autowired
	private RolesRepository rolesRepository;

	@Secured(identifier = "getRoles")
	@GetMapping()
	public List<Role> getRoles() {
		List<Role> roles = new ArrayList<>();
		List<RolesEntity> rolesEntities = rolesRepository.findAll();
		rolesEntities.forEach(roleEntity -> {
			Role role = new Role();
			role.setId(roleEntity.getId());
			role.setRole(roleEntity.getName());
			roles.add(role);
		});
		return roles;
	}
}
