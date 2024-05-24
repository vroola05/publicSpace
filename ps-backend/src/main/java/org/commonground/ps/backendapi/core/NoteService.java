package org.commonground.ps.backendapi.core;

import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.commonground.ps.backendapi.model.User;

public interface NoteService {
    public Optional<NoteEntity> save(Long id, String content, Long noteTypeId, User user, boolean visible);
    public Optional<NoteEntity> createNoteEntity(Long callId, String content, Long noteTypeId, User user, boolean visible);
}
