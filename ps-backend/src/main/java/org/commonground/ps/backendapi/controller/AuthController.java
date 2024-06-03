package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.commonground.ps.backendapi.core.ConfigService;
import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.ForbiddenException;
import org.commonground.ps.backendapi.exception.NotFoundException;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;

import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Login;
import org.commonground.ps.backendapi.model.UserSession;
import org.commonground.ps.backendapi.model.security.UserPrincipal;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.template.Template;
import org.commonground.ps.backendapi.security.ApiSecurityFilter;
import org.commonground.ps.backendapi.security.SecureHash;
import org.commonground.ps.backendapi.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

	@Autowired
	private UserRepository userRepository;

	@Autowired
	ConfigService configService;

	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<User> login(HttpServletRequest request, HttpSession session, @RequestHeader("${sec.header.config}") String referer,
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
					String apikey = (UUID.randomUUID().toString() + UUID.randomUUID().toString());

					// UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);

					User user = Convert.userEntity(userEntity);
					UserPrincipal userPrincipal = new UserPrincipal();
					userPrincipal.setName(user.getName());
					userPrincipal.setPrincipal(user);
					userPrincipal.setDetails(template);
					userPrincipal.setAuthorities(getAuthorities(user.getRoles()));
					userPrincipal.setAuthenticated(true);
					userPrincipal.setApikey(apikey);
					user.setApikey(apikey);
					// System.out.println(session.getId());
					
					// session.invalidate();
					// HttpSession newSession = request.getSession();
					
					session.setAttribute("userPrincipal", userPrincipal);
					
					System.out.println(session.getId());
					return ResponseEntity.ok().body(user);
				}
			}

		} catch (SecurityException ex) {
			throw new NotFoundException();
		}
		throw new ForbiddenException();
	}

	private Collection<? extends GrantedAuthority> getAuthorities(List<String> roles) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (String role : roles) {
      authorities.add(new SimpleGrantedAuthority(role));
    }
    return authorities;
  }
}
