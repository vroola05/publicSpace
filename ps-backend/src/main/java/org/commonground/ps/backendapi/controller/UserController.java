package org.commonground.ps.backendapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.jpa.repositories.RolesRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.UserExtended;
import org.commonground.ps.backendapi.security.SecureHash;
import org.commonground.ps.backendapi.security.Secured;
import org.commonground.ps.backendapi.validators.PostUserValidator;
import org.commonground.ps.backendapi.validators.PutUserValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping(value = "/company/{companyId}/domain/{domainId}/user", produces = { "application/json; charset=utf-8" })
public class UserController extends Controller {

	@Value("${sec.gen.hash.function}")
	public String defaultHashFunction;

	@Value("${sec.gen.salt.length}")
	public int defaultSaltLength;

	@Value("${sec.gen.iteration.count}")
	public int defaultIterationCount;

	@Value("${sec.gen.key.length}")
	public int defaultKeyLength;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RolesRepository rolesRepository;

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Secured(identifier = "getUsers")
	@GetMapping()
	public List<User> getUsers(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId) {
		isValid(companyId, domainId);

		List<User> users = new ArrayList<>();
		List<UserEntity> userEntities = userRepository.getUsers(domainId);
		userEntities.forEach(userEntity -> {
			users.add(Convert.userEntity(userEntity));
		});
		return users;
	}

	@Secured(identifier = "getUsersOfGroup")
	@GetMapping(value = "/of/group/{groupId}")
	public List<User> getUsersOfGroup(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long groupId) {
		isValid(companyId, domainId);

		List<User> users = new ArrayList<>();
		List<UserEntity> userEntities = userRepository.getUserByGroupId(domainId, groupId);
		userEntities.forEach(userEntity -> {
			users.add(Convert.userEntity(userEntity));
		});
		return users;
	}

	@Secured(identifier = "postUser")
	@PostMapping(consumes = "application/json", produces = "application/json")
	public User postUser(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@Valid @PostUserValidator @RequestBody UserExtended user) {

		isValid(companyId, domainId);
		validateUser(domainId, user);

		UserEntity userEntity = Convert.user(user);

		if (getUser().isAdmin()) {
			userEntity.setAdmin(user.isAdmin());
		}

		SecureHash secureHash = new SecureHash(defaultHashFunction, defaultSaltLength, defaultIterationCount,
				defaultKeyLength);
		String salt = secureHash.generateSalt(secureHash.defaultSaltLength);
		userEntity.setPasswordSalt(salt);
		userEntity.setPasswordHashFunction(secureHash.defaultHashFunction);
		userEntity.setPasswordIterationCount(Long.valueOf(secureHash.defaultIterationCount));
		userEntity.setPasswordKeyLength(Long.valueOf(secureHash.defaultKeyLength));

		userEntity.setPassword(secureHash.generateHashBase64(
				user.getPassword(),
				salt,
				secureHash.defaultIterationCount,
				secureHash.defaultKeyLength,
				secureHash.defaultHashFunction));

		Optional<DomainEntity> domainEntity = domainRepository.findById(domainId);
		if (domainEntity.isPresent()) {
			userEntity.setDomain(domainEntity.get());
		}

		attachRoles(user.getRoles(), userEntity);
		attachGroups(user.getGroups(), userEntity, domainId);

		return Convert.userEntity(userRepository.saveAndFlush(userEntity));
	}

	@Secured(identifier = "putUser")
	@PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
	public User putUser(
			@PathVariable @NotNull(message = "Waarde is verplicht") Long companyId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long domainId,
			@PathVariable @NotNull(message = "Waarde is verplicht") Long id,
			@Valid @PutUserValidator @RequestBody User user) throws BadRequestException {

		isValid(companyId, domainId);

		validateUser(domainId, user);

		Optional<UserEntity> optionalUserEntity = userRepository.findById(id);
		if (optionalUserEntity.isPresent() && id == user.getId()) {
			UserEntity userEntity = optionalUserEntity.get();

			userEntity.setName(user.getName());
			userEntity.setUsername(user.getUsername());
			userEntity.setEmail(user.getEmail());

			if (getUser().isAdmin()) {
				System.out.println("Is admin: " + user.isAdmin());
				userEntity.setAdmin(user.isAdmin());
			}

			attachRoles(user.getRoles(), userEntity);

			attachGroups(user.getGroups(), userEntity, domainId);

			return Convert.userEntity(userRepository.save(userEntity));
		}
		throw new BadRequestException();
	}

	private void validateUser(Long domainId, User user) throws BadRequestException {
		Optional<UserEntity> nameUniqueValidator = userRepository.getUserByName(domainId, user.getName());
		if (nameUniqueValidator.isPresent() && nameUniqueValidator.get().getId() != user.getId()) {
			BadRequestException badRequestException = new BadRequestException();
			badRequestException.addError(new FieldValue("name", "Er is al een gebruiker met deze naam."));
			throw badRequestException;
		}

		Optional<UserEntity> usernameUniqueValidator = userRepository.getUserByUsername(domainId, user.getUsername());
		if (usernameUniqueValidator.isPresent() && usernameUniqueValidator.get().getId() != user.getId()) {
			BadRequestException badRequestException = new BadRequestException();
			badRequestException.addError(new FieldValue("username", "Er is al een gebruiker met deze gebruikersnaam."));
			throw badRequestException;
		}
	}

	private void attachRoles(List<String> roles, UserEntity userEntity) {
		userEntity.getRoles().clear();

		List<RolesEntity> rolesEntities = rolesRepository.findAll();
		roles.forEach(role -> {
			for (RolesEntity roleEntity : rolesEntities) {
				if (roleEntity.getName().equals(role)) {
					userEntity.getRoles().add(roleEntity);
					break;
				}
			}
		});
	}

	private void attachGroups(List<Group> groups, UserEntity userEntity, Long domainId) {
		userEntity.getGroups().clear();

		List<GroupEntity> groupEntities = groupRepository.getGroups(domainId);
		groups.forEach(group -> {
			for (GroupEntity groupEntity : groupEntities) {
				if (groupEntity.getId() == group.getId()) {
					userEntity.getGroups().add(groupEntity);
					break;
				}
			}
		});
	}
}
