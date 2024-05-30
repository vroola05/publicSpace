package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
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
import org.hibernate.envers.RelationTargetAuditMode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "contract")
public class ContractEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_contract_id")
  @SequenceGenerator(name = "seq_contract_id", sequenceName = "seq_contract_id", allocationSize = 1)
  private Long id;
  private Date dateCreated;
  private Boolean accepted;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "domain_id_governent", nullable = false)
  private DomainEntity domainGovernment;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "domain_id_contractor", nullable = false)
  private DomainEntity domainContractor;

  // @OrderBy("mainCategory DESC")
  @OneToMany(targetEntity = ContractMainCategoryEntity.class, mappedBy = "contract", cascade = CascadeType.MERGE, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<ContractMainCategoryEntity> contractMainCategories = new ArrayList<>();

  public void addMainCategory(MainCategoryEntity mainCategoryEntity) {
    ContractMainCategoryEntity contractMainCategoryEntity = new ContractMainCategoryEntity(this, mainCategoryEntity);
    contractMainCategories.add(contractMainCategoryEntity);
    mainCategoryEntity.getContractMainCategory().add(contractMainCategoryEntity);
  }

  @OneToMany(targetEntity = ContractSpecificationEntity.class, mappedBy = "contract", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  // @OrderBy("dateStart ASC")
  private List<ContractSpecificationEntity> contractSpecifications = new ArrayList<>();
}
