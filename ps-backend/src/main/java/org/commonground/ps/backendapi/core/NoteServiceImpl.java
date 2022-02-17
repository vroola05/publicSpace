package org.commonground.ps.backendapi.core;

import java.util.Date;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.jpa.repositories.NoteTypeRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteServiceImpl implements NoteService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private NoteTypeRepository noteTypeRepository;
	

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

}
