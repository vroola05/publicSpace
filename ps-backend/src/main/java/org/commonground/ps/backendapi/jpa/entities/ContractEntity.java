package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;

import org.locationtech.jts.geom.Geometry;

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
@Table(name = "contract")
public class ContractEntity {
  @Id
  // @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_company_id")
  // @SequenceGenerator(name = "seq_company_id", sequenceName = "seq_company_id", allocationSize = 1)
  private Long id;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "domain_id_governent", nullable = false)
  private DomainEntity domainGovernment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "domain_id_contractor", nullable = false)
  private DomainEntity domainContractor;
}
