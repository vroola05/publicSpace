package org.commonground.ps.backendapi.jpa.entities;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "person")
public class PersonEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_person_id")
  @SequenceGenerator(name = "seq_person_id", sequenceName = "seq_person_id", allocationSize = 1)
  private Long id;
  
  private String name;

  private String email;
  private String phone;

  private String street;
  private String number;
  private String letter;
  private String postal;
  private String city;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "call_id", referencedColumnName = "id")
  private CallEntity call;

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (object == null || getClass() != object.getClass()) {
      return false;
    }
    PersonEntity o = (PersonEntity) object;
    return id == o.id;
  }
}
