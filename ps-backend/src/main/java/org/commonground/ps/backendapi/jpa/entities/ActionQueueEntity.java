package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;
import java.util.UUID;

import org.commonground.ps.backendapi.model.enums.ActionQueueState;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "action_queue")
public class ActionQueueEntity {
  @Id
  // @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  private Date dateCreated;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "call_id", referencedColumnName = "id")
  private CallEntity call;
  
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "order_id", referencedColumnName = "id")
  private OrderEntity order;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private UserEntity user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "action_id", referencedColumnName = "id")
  private ActionEntity action;

  private ActionQueueState state;
}
