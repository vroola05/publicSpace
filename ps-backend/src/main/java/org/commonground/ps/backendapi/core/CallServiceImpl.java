package org.commonground.ps.backendapi.core;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.LocationEntity;
import org.commonground.ps.backendapi.jpa.entities.PersonEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.CategoryRepository;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.GroupRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.ActionEnum;
import org.commonground.ps.backendapi.model.enums.NoteTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CallServiceImpl implements CallService {
    @Autowired
	private CallRepository callRepository;
    
    @Autowired
	private ActionService actionService;

	@Autowired
	private NoteService noteService;

    @Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private DomainRepository domainRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GroupRepository groupRepository;

    @Override
    public Optional<Call> getCallById(User user, Long id) {
        
		Optional<CallEntity> callEntityOptional = getCallEntityById(user, id);

		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}
        
        return Optional.of(Convert.callEntity(callEntityOptional.get(), user.getDomain().getDomainType()));
    }

	@Override
    public Optional<CallEntity> getCallEntityById(User user, Long id) {
		Optional<CallEntity> callEntityOptional = callRepository.getCallById(id, user.getDomain().getId());

        if (!callEntityOptional.isEmpty() && !hasAccess(user, callEntityOptional.get())) {
            return Optional.empty();
        }
        
        return callEntityOptional;
    }
	
    public boolean hasAccess(User user, CallEntity callEntity) {
        return user.getGroups().stream().anyMatch(group -> group.getId() == callEntity.getGroup().getId())
            || (callEntity.getUser() != null && user.getId() == callEntity.getUser().getId());
    }


    @Override
    public Optional<Call> save(User user, Call call) {

        Optional<CallEntity> callEntityOptional = convertCall(user, call);
        if (callEntityOptional.isEmpty()) {
            return Optional.empty();
        }

        CallEntity callEntity = callEntityOptional.get();
		callEntity.setDateCreated(new Date());
		callEntity.setCasenumber(getCasenumber());

		CallEntity callEntityNew = callRepository.save(callEntity);

		noteService.save(callEntityNew, "Nieuwe melding aangemaakt.", NoteTypeEnum.SYSTEM.getValue(), user, false);

		actionService.call(user.getDomain().getId(), callEntityNew.getId(), ActionEnum.CALL_CREATE);

		return Optional.of(Convert.callEntity(callEntityNew, user.getDomain().getDomainType()));
    }

    public Optional<CallEntity> convertCall(User user, Call call) {
		Optional<DomainEntity> domainEntityOptional = domainRepository.findById(user.getDomain().getId());
		Optional<CategoryEntity> categoryEntityOptional = categoryRepository.getCategory(call.getMainCategory().getCategory().getId(), user);
		if (domainEntityOptional.isPresent() && categoryEntityOptional.isPresent()) {
			CallEntity callEntity = Convert.call(call);
			callEntity.setDomain(domainEntityOptional.get());
			callEntity.setCategory(categoryEntityOptional.get());
			callEntity.setGroup(categoryEntityOptional.get().getGroup());
			
			LocationEntity locationEntity = Convert.location(call.getLocation());
			locationEntity.setCall(callEntity);
			callEntity.setLocation(locationEntity);

			if (call.getPerson() != null) {
				PersonEntity personEntity = Convert.person(call.getPerson());
				personEntity.setCall(callEntity);
				callEntity.setPerson(personEntity);
			}

			return Optional.of(callEntity);
		}

		return Optional.empty();
	}

    public String getCasenumber(){
		BigDecimal casenumber = callRepository.getNextCasenumber();
		return casenumber.toString();
	}

	@Override
	public Optional<Call> setUser(User user, Long id, User userNew) {
		Optional<CallEntity> callEntityOptional = getCallEntityById(user, id);

		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		CallEntity callEntity = callEntityOptional.get();

		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), userNew.getId());

		if (userEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		UserEntity userEntity = userEntityOptional.get();

		if(userEntity.getGroups().stream().noneMatch(group -> group.getId() == callEntity.getGroup().getId())) {
			return Optional.empty();
		}

		callEntity.setUser(userEntity);

		callRepository.saveAndFlush(callEntity);

		actionService.call(user.getDomain().getId(), callEntity.getId(), ActionEnum.ASSIGN_PERSON);

		return Optional.of(Convert.callEntity(callEntity, user.getDomain().getDomainType()));
	}

	@Override
	public Optional<Call> setGroup(User user, Long id, Group groupNew) {
		Optional<CallEntity> callEntityOptional = getCallEntityById(user, id);
	
		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		CallEntity callEntity = callEntityOptional.get();

		Optional<GroupEntity> groupEntityOptional = groupRepository.getGroupById(groupNew.getId(), user.getDomain().getId());

		if (groupEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		GroupEntity groupEntity = groupEntityOptional.get();

		callEntity.setGroup(groupEntity);

		callRepository.saveAndFlush(callEntity);

		actionService.call(user.getDomain().getId(), callEntity.getId(), ActionEnum.ASSIGN_GROUP);

		return Optional.of(Convert.callEntity(callEntity, user.getDomain().getDomainType()));
	}

	@Override
	public Optional<Call> setGroupAndUser(User user, Long id, Long groupId, User userNew) {
		Group group = new Group();
		group.setId(groupId);

		if (setGroup(user, id, group).isEmpty()) {
			return Optional.empty();
		}
		return setUser(user, id, userNew);
	}
}
