package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "contract")
public class ContractEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_contract_id")
  @SequenceGenerator(name = "seq_contract_id", sequenceName = "seq_contract_id", allocationSize = 1)
  private Long id;
  private Date dateCreated;
  private Boolean accepted;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "domain_id_governent", nullable = false)
  private DomainEntity domainGovernment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "domain_id_contractor", nullable = false)
  private DomainEntity domainContractor;
}
