package org.commonground.ps.backendapi.controller;

import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.commonground.ps.backendapi.model.template.Template;
import org.springframework.security.core.context.SecurityContextHolder;

public class Controller {
  public User getUser() {
		UserPrincipal userPrincipal = (UserPrincipal)SecurityContextHolder.getContext().getAuthentication();
		return userPrincipal.getPrincipal();
	}

	public Template getTemplate() {
		UserPrincipal userPrincipal = (UserPrincipal)SecurityContextHolder.getContext().getAuthentication();
		return (Template)userPrincipal.getDetails();
	}
}
