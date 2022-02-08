package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.envers.NotAudited;

import lombok.Data;
import lombok.NoArgsConstructor;

@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
@Data
@NoArgsConstructor
@Entity
@Table(name = "groups")
public class GroupEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_group_id")
  @SequenceGenerator(name = "seq_group_id", sequenceName = "seq_group_id", allocationSize = 1)
  private Long id;
  private String name;

  @NotAudited
  @ManyToOne(fetch = FetchType.LAZY)
  private DomainEntity domain;
}
