package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Audited
@EntityListeners(AuditingEntityListener.class)
@Table(name = "contract_specification")
public class ContractSpecificationEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_contract_specification")
  @SequenceGenerator(name = "seq_contract_specification", sequenceName = "seq_contract_specification", allocationSize = 1)
  private Long id;
  private String description;
  private Date dateCreated;
  private Date dateStart;
  private Date dateEnd;
  private Boolean active;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "contract_id", nullable = false)
  private ContractEntity contract;

  @OneToMany(targetEntity = ContractSpecificationItemEntity.class, mappedBy = "contractSpecification", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @OrderBy("specificationNumber ASC")
  private List<ContractSpecificationItemEntity> contractSpecificationItems = new ArrayList<>();
}
