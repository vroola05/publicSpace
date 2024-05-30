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
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
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
  private Boolean accepted;
  private Boolean active;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "contract_id", nullable = false)
  private ContractEntity contract;

  @OneToMany(targetEntity = ContractSpecificationItemEntity.class, mappedBy = "contractSpecification", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @OrderBy("specificationNumber ASC")
  private List<ContractSpecificationItemEntity> contractSpecificationItems = new ArrayList<>();
}
