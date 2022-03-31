package org.commonground.ps.backendapi.core;

import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.commonground.ps.backendapi.model.User;

public interface NoteService {
    public Optional<NoteEntity> save(CallEntity callEntity, String content, Long noteTypeId, User user, boolean visible);
    public Optional<NoteEntity> createNoteEntity(String content, Long noteTypeId, User user, boolean visible);
}
