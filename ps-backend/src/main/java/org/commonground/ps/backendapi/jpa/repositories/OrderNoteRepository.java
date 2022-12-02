package org.commonground.ps.backendapi.jpa.repositories;

import org.commonground.ps.backendapi.jpa.entities.OrderNoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderNoteRepository extends JpaRepository<OrderNoteEntity, Long> {

}
