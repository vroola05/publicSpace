package org.commonground.ps.backendapi.controller;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.model.template.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/config", produces = { "application/json; charset=utf-8" })
public class ConfigController {

	@Autowired
	ConfigService configService;

	@GetMapping()
	public Template get(@RequestHeader("${sec.header.config}") String referer) throws NotFoundException {
		try {
			return configService.find(referer);
		} catch (SecurityException ex) {
			throw new NotFoundException();
		}
	}
}
