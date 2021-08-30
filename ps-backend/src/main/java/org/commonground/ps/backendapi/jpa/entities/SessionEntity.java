package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "session")
public class SessionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_session_id")
  @SequenceGenerator(name = "seq_session_id", sequenceName = "seq_session_id", allocationSize = 1)
  private Long id;
  private String apiKey;
  private Date dateCreated;
  private Date dateModified;

  public SessionEntity(String apiKey) {
    this.apiKey = apiKey;
  }

  @ManyToOne()
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private UserEntity users;
}
