package org.commonground.ps.backendapi.jpa.repositories;

import org.commonground.ps.backendapi.jpa.entities.OrderSpecificationItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderSpecificationItemRepository extends JpaRepository<OrderSpecificationItemEntity, Long> {

}
