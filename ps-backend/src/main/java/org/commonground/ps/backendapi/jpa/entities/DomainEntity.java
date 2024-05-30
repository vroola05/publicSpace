package org.commonground.ps.backendapi.jpa.entities;

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
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

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
}
