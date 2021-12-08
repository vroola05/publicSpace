package org.commonground.ps.backendapi.jpa.entities;

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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "domain")
public class DomainEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_domain_id")
  @SequenceGenerator(name = "seq_domain_id", sequenceName = "seq_domain_id", allocationSize = 1)
  private Long id;
  private String domain;
  private String name;

  @ManyToOne()
  @JoinColumn(name="domain_type", referencedColumnName = "id")
  private DomainTypeEntity domainType;

  @ManyToOne()
  @JoinColumn(name="company_id", referencedColumnName = "id")
  private CompanyEntity company;

  @OneToMany(mappedBy = "domain", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<UserEntity> users;

  @OneToMany(mappedBy = "domain", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<GroupEntity> groups;

  @OneToMany(mappedBy = "domain", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<StatusEntity> statusses;

  // @OrderBy("sort ASC")
  @OneToMany(targetEntity = ContractEntity.class, mappedBy = "domainGovernment", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<ContractEntity> contractsContractor;

  @OneToMany(targetEntity = ContractEntity.class, mappedBy = "domainContractor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<ContractEntity> contractsGovernment;
}
