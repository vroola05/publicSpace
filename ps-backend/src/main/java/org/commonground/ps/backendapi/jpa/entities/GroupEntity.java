package org.commonground.ps.backendapi.jpa.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

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
