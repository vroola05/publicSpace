package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "note")
public class NoteEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_note_id")
  @SequenceGenerator(name = "seq_note_id", sequenceName = "seq_note_id", allocationSize = 1)
  private Long id;
  private String content;
  private Date dateCreated;

  @ManyToOne()
  @JoinColumn(name = "call_id", referencedColumnName = "id", nullable = false)
  private CallEntity call;

  @ManyToOne()
  @JoinColumn(name = "note_type_id", referencedColumnName = "id", nullable = false)
  private NoteTypeEntity noteType;
  
  @ManyToOne()
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private UserEntity user;

  private Boolean visible;

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (object == null || getClass() != object.getClass()) {
      return false;
    }
    NoteEntity o = (NoteEntity) object;
    return id == o.id;
  }
}
