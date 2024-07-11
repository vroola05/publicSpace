package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders_note")
public class OrderNoteEntity {
  @Id
  private UUID id;
  private String content;
  private Date dateCreated;
  private Boolean definite;

  @ManyToOne()
  @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false)
  private OrderEntity order;
  
  @ManyToOne()
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private UserEntity user;
}
