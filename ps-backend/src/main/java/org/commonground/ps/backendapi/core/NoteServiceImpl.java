package org.commonground.ps.backendapi.core;

import java.util.Date;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.CallRepository;
import org.commonground.ps.backendapi.jpa.repositories.NoteRepository;
import org.commonground.ps.backendapi.jpa.repositories.NoteTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.User;
import org.springframework.stereotype.Service;

@Service
public class NoteServiceImpl implements NoteService {
	private final UserRepository userRepository;
	private final NoteTypeRepository noteTypeRepository;
	private final NoteRepository noteRepository;
	private final CallRepository callRepository;

	public NoteServiceImpl(
			CallRepository callRepository,
			NoteRepository noteRepository,
			NoteTypeRepository noteTypeRepository,
			UserRepository userRepository) {
		this.userRepository = userRepository;
		this.noteTypeRepository = noteTypeRepository;
		this.noteRepository = noteRepository;
		this.callRepository = callRepository;

	}

	@Override
	public Optional<NoteEntity> createNoteEntity(Long callId, String content, Long noteTypeId, User user, boolean visible) {
		NoteEntity noteEntity = new NoteEntity();
		noteEntity.setContent(content);
		if (user != null) {
			Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
			if (userEntityOptional.isPresent()) {
				noteEntity.setUser(userEntityOptional.get());
			}
		}

		Optional<CallEntity> callEntityOptional = callRepository.findById(callId);
		if (callEntityOptional.isEmpty()) {
			return Optional.empty();
		}
		noteEntity.setCall(callEntityOptional.get());

		Optional<NoteTypeEntity> noteTypeOptional = noteTypeRepository.findById(noteTypeId);
		if (noteTypeOptional.isEmpty()) {
			return Optional.empty();
		}
		noteEntity.setNoteType(noteTypeOptional.get());

		noteEntity.setDateCreated(new Date());
		noteEntity.setVisible(visible);

		return Optional.of(noteEntity);
	}



	@Override
	public Optional<NoteEntity> save(Long callId, String content, Long noteTypeId, User user, boolean visible) {
		Optional<NoteEntity> noteEntityOptional = createNoteEntity(callId, content, noteTypeId, user, visible);
		if (noteEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		NoteEntity noteEntity = noteEntityOptional.get();
		
		return Optional.of(noteRepository.save(noteEntity));
	}

}
