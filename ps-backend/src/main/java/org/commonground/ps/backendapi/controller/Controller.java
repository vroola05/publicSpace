package org.commonground.ps.backendapi.controller;

import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.commonground.ps.backendapi.model.template.DomainT;
import org.springframework.security.core.context.SecurityContextHolder;

public class Controller {
  public User getUser() {
		UserPrincipal userPrincipal = (UserPrincipal)SecurityContextHolder.getContext().getAuthentication();
		return userPrincipal.getPrincipal();
	}

	public DomainT getDomain() {
		UserPrincipal userPrincipal = (UserPrincipal)SecurityContextHolder.getContext().getAuthentication();
		return (DomainT)userPrincipal.getDetails();
	}

	public void isValid(Long companyId) throws NotFoundException {
		User user = getUser();
		if (!user.isAdmin() && user.getCompany().getId() != companyId) {
			throw new NotFoundException();
		}
	}

	public void isValid(Long companyId, Long domainId) throws NotFoundException {
		User user = getUser();
		if (!user.isAdmin() && (user.getCompany().getId() != companyId || user.getDomain().getId() != domainId)) {
			throw new NotFoundException();
		}
	}
}
