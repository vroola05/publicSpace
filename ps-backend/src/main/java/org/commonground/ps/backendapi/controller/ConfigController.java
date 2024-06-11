package org.commonground.ps.backendapi.controller;

import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.model.template.Template;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/config", produces = { "application/json; charset=utf-8" })
public class ConfigController {

	private final ConfigService configService;

	public ConfigController(ConfigService configService) {
		this.configService = configService;

	}

	@GetMapping()
	public Template get(@RequestHeader("${sec.header.config}") String referer) throws NotFoundException {
		try {
			return configService.find(referer);
		} catch (SecurityException ex) {
			throw new NotFoundException();
		}
	}
}
