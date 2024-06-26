package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;



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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "call_id", nullable = false)
    private CallEntity call;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "domain_id", nullable = false)
    private DomainEntity domain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private StatusEntity status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "action_type_id", nullable = false)
    private ActionTypeEntity actionTypeEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = true)
    private GroupEntity group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private UserEntity user;

    @OneToMany(targetEntity = OrderCategoryEntity.class, mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderCategoryEntity> orderCategory = new ArrayList<>();

    
    @OneToMany(targetEntity = OrderSpecificationItemEntity.class, mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<OrderSpecificationItemEntity> orderSpecificationItems = new ArrayList<>();

    @OrderBy("dateCreated DESC")
    @OneToMany(targetEntity = OrderNoteEntity.class, mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderNoteEntity> orderNote = new ArrayList<>();
}
