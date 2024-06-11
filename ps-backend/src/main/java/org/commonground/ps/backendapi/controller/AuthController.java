package org.commonground.ps.backendapi.controller;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import jakarta.validation.Valid;

import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.core.security.SecureHash;
import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.ForbiddenException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.SessionEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.SessionRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Login;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.template.Template;
import org.commonground.ps.backendapi.util.DateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/login", produces = { "application/json; charset=utf-8" })
public class AuthController extends Controller {

	@Value("${sec.gen.hash.function}")
	public String defaultHashFunction;

	@Value("${sec.gen.salt.length}")
	public int defaultSaltLength;

	@Value("${sec.gen.iteration.count}")
	public int defaultIterationCount;

	@Value("${sec.gen.key.length}")
	public int defaultKeyLength;

	@Value("${sec.header.apikey}")
	private String responseHeaderApiKey;

	@Value("${sec.session.time}")
	private int secSessionTime;

	private final UserRepository userRepository;
	private final SessionRepository sessionRepository;
	private final ConfigService configService;

	public AuthController(
		UserRepository userRepository,
		SessionRepository sessionRepository,
		ConfigService configService) {
			this.userRepository = userRepository;
			this.sessionRepository = sessionRepository;
			this.configService = configService;

	}

	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<User> login(@RequestHeader("${sec.header.config}") String referer,
			@Valid @RequestBody Login login) throws ForbiddenException, NotFoundException {
		try {
			Template template = configService.find(referer);

			if (template.getDomain() == null || template.getDomain().getId() == null) {
				throw new NotFoundException();
			}
			Optional<UserEntity> userEntityOptional = userRepository.getUserByUsername(template.getDomain().getId(), login.getUsername());

			if (userEntityOptional.isPresent()) {
				UserEntity userEntity = userEntityOptional.get();

				SecureHash secureHash = new SecureHash(defaultHashFunction, defaultSaltLength, defaultIterationCount, defaultKeyLength);
				String hash = secureHash.generateHashBase64(
						login.getPassword(),
						userEntity.getPasswordSalt(),
						userEntity.getPasswordIterationCount().intValue(),
						userEntity.getPasswordKeyLength().intValue(),
						userEntity.getPasswordHashFunction());

				if (userEntity.getPassword().equals(hash)) {
					String apikey = (UUID.randomUUID().toString() + UUID.randomUUID().toString()).replaceAll("-", "");

					sessionRepository.deleteByDateModifiedLessThan(DateUtil.minusMinutes(secSessionTime));
					Date now = new Date();
					SessionEntity sessionEntity = new SessionEntity();
					sessionEntity.setApiKey(apikey);
					sessionEntity.setDateCreated(now);
					sessionEntity.setDateModified(now);
					sessionEntity.setUsers(userEntity);
					sessionRepository.save(sessionEntity);

					sessionRepository.flush();
					User user = Convert.userEntity(userEntity);
					user.setApikey(apikey);
					return ResponseEntity.ok()
							.body(user);
				}
			}

		} catch (SecurityException ex) {
			throw new NotFoundException();
		}
		throw new ForbiddenException();
	}
}
