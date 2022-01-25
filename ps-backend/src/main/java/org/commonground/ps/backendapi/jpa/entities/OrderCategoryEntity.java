package org.commonground.ps.backendapi.jpa.entities;

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
@Table(name = "orders_category")
public class OrderCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_orders_category_id")
    @SequenceGenerator(name = "seq_orders_category_id", sequenceName = "seq_orders_category_id", allocationSize = 1)
    private Long id;

    @ManyToOne()
    @JoinColumn(name="order_id", referencedColumnName = "id")
    private OrderEntity order;

    @ManyToOne()
    @JoinColumn(name="category_id", referencedColumnName = "id")
    private CategoryEntity category;


}
