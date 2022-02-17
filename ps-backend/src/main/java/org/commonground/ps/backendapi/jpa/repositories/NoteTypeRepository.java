package org.commonground.ps.backendapi.jpa.repositories;

import org.commonground.ps.backendapi.jpa.entities.NoteTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteTypeRepository extends JpaRepository<NoteTypeEntity, Long> {

}
