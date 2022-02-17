package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
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

}
