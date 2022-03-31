package org.commonground.ps.backendapi.jpa.repositories;

import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<NoteEntity, Long> {

}
