package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Audited
@EntityListeners(AuditingEntityListener.class)
@Table(name = "contract_specification_items")
public class ContractSpecificationItemEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_contract_specification_items")
  @SequenceGenerator(name = "seq_contract_specification_items", sequenceName = "seq_contract_specification_items", allocationSize = 1)
  private Long id;
  private String specificationNumber;
  private String name;
  private String unit;
  private String price;
  private Boolean active;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "contract_specification_id", nullable = false)
  private ContractSpecificationEntity contractSpecification;

  @NotAudited
  @OneToMany(targetEntity = OrderSpecificationItemEntity.class, mappedBy = "contractSpecificationItem")
    private List<OrderSpecificationItemEntity> orderSpecificationItems = new ArrayList<>();
}
