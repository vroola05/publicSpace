package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders_note")
public class OrderNoteEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_orders_category_id")
  @SequenceGenerator(name = "seq_orders_category_id", sequenceName = "seq_orders_category_id", allocationSize = 1)
  private Long id;
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
