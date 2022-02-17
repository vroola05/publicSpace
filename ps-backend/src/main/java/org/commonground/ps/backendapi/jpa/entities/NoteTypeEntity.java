package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;

import lombok.Data;
import lombok.NoArgsConstructor;

@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
@Data
@NoArgsConstructor
@Entity
@Table(name = "note_type")
public class NoteTypeEntity {
  @Id
  private Long id;
  private String name;
}
