package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_order_id")
    @SequenceGenerator(name = "seq_order_id", sequenceName = "seq_order_id", allocationSize = 1)
    private Long id;

    private String description;
    @OrderColumn
    private Date dateCreated;
    private Date dateEnded;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "call_id", nullable = false)
    private CallEntity call;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "domain_id", nullable = false)
    private DomainEntity domain;

    @ManyToOne(fetch = FetchType.EAGER)
    private StatusEntity status;

    @ManyToOne(fetch = FetchType.EAGER)
    private GroupEntity group;

    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity user;

    @OneToMany(targetEntity = OrderCategoryEntity.class, mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderCategoryEntity> orderCategory = new ArrayList<>();

}
