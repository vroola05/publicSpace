package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.CascadeType;
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
