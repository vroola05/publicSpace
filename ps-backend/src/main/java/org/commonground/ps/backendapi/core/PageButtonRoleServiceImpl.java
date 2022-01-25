package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonRolesEntity;
import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.commonground.ps.backendapi.jpa.repositories.RolesRepository;
import org.commonground.ps.backendapi.model.PageButton;
import org.commonground.ps.backendapi.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageButtonRoleServiceImpl implements PageButtonRoleService {

	@Autowired
	private RolesRepository rolesRepository;

	@Override
	public List<RolesEntity> getRoles() {
		List<RolesEntity> rolesEntities = rolesRepository.findAll();
		return rolesEntities;
	}

	public void convertPageButtonRoles(PageButton pageButton, PageButtonEntity pageButtonEntity) throws BadRequestException {
				List<RolesEntity> roleEntities = getRoles();
				List<Role> roles = pageButton.getRoles();
				for (Role role : roles) {
					if (pageButtonEntity.getRoles().stream().noneMatch(r -> r.getRole().getId() == role.getId())) {
						// Insert
						PageButtonRolesEntity pageButtonRolesEntity = new PageButtonRolesEntity();
						pageButtonRolesEntity.setPageButton(pageButtonEntity);
						pageButtonRolesEntity.setAllow(true);
						Optional<RolesEntity> rolesEntityOptional = roleEntities.stream().filter(r -> r.getId() == role.getId()).findFirst();
						if (rolesEntityOptional.isPresent()) {
							pageButtonRolesEntity.setRole(rolesEntityOptional.get());
						} else {
							throw new BadRequestException();
						}
						pageButtonEntity.getRoles().add(pageButtonRolesEntity);
					}
				}

				// Remove
				pageButtonEntity.getRoles()
					.removeIf(pageButtonRolesEntity -> 
						roles.stream().noneMatch(role -> role.getId() == pageButtonRolesEntity.getRole().getId()));
		
	}

}
