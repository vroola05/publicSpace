package org.commonground.ps.backendapi.core;

import java.util.Date;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.NoteRepository;
import org.commonground.ps.backendapi.jpa.repositories.NoteTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteServiceImpl implements NoteService {

	@Autowired
	private CallService callService;

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private NoteTypeRepository noteTypeRepository;
	
	@Autowired
	private NoteRepository noteRepository;

	@Override
	public Optional<NoteEntity> createNoteEntity(String content, Long noteTypeId, User user, boolean visible) {
		NoteEntity noteEntity = new NoteEntity();
		noteEntity.setContent(content);
		if (user != null) {
			Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
			if (userEntityOptional.isPresent()) {
				noteEntity.setUser(userEntityOptional.get());
			}
		}

		Optional<NoteTypeEntity> noteTypeOptional = noteTypeRepository.findById(noteTypeId);
		if (noteTypeOptional.isEmpty()) {
			return Optional.empty();
		}
		noteEntity.setDateCreated(new Date());
		noteEntity.setNoteType(noteTypeOptional.get());
		noteEntity.setVisible(visible);

		return Optional.of(noteEntity);
	}



	@Override
	public Optional<NoteEntity> save(CallEntity callEntity, String content, Long noteTypeId, User user,
			boolean visible) {
		Optional<NoteEntity> noteEntityOptional = createNoteEntity(content, noteTypeId, user, visible);
		if (noteEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		NoteEntity noteEntity = noteEntityOptional.get();
		noteEntity.setCall(callEntity);
		
		return Optional.of(noteRepository.save(noteEntity));
	}

	public Optional<NoteEntity> save(Long id, String content, Long noteTypeId, User user,
			boolean visible) {
		
		CallEntity callEntity;
		if (user.getDomain().getDomainType().getId() == DomainTypeEnum.CONTRACTOR.id) {
			Optional<OrderEntity> orderEntityOptional = orderService.getOrderEntityById(user, id, DomainTypeEnum.CONTRACTOR);
			if (orderEntityOptional.isEmpty()) {
				return Optional.empty();
			}
			callEntity = orderEntityOptional.get().getCall();
		} else {
			Optional<CallEntity> callEntityOptional = callService.getCallEntityById(user, id);
			if (callEntityOptional.isEmpty()) {
				return Optional.empty();
			}
			callEntity = callEntityOptional.get();
		}
		
		Optional<NoteEntity> noteEntityOptional = createNoteEntity(content, noteTypeId, user, visible);
		if (noteEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		NoteEntity noteEntity = noteEntityOptional.get();
		noteEntity.setCall(callEntity);
		
		return Optional.of(noteRepository.save(noteEntity));
	}
}
