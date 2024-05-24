package org.commonground.ps.backendapi.jpa.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders_specification_item")
public class OrderSpecificationItemEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_orders_specification_item")
  @SequenceGenerator(name = "seq_orders_specification_item", sequenceName = "seq_orders_specification_item", allocationSize = 1)
  private Long id;
  private String amount;

  @ManyToOne(cascade = CascadeType.REFRESH)
  @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false)
  private OrderEntity order;
  
  @ManyToOne()
  @JoinColumn(name = "contract_specification_item_id", referencedColumnName = "id", nullable = false)
  private ContractSpecificationItemEntity contractSpecificationItem;
}
