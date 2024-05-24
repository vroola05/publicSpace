package org.commonground.ps.backendapi.jpa.entities;

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
@Table(name = "orders_category")
public class OrderCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_orders_category_id")
    @SequenceGenerator(name = "seq_orders_category_id", sequenceName = "seq_orders_category_id", allocationSize = 1)
    private Long id;

    @ManyToOne()
    @JoinColumn(name="order_id", referencedColumnName = "id", nullable = false)
    private OrderEntity order;

    @ManyToOne()
    @JoinColumn(name="category_id", referencedColumnName = "id")
    private CategoryEntity category;


}
