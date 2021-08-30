package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "location")
public class LocationEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_location_id")
  @SequenceGenerator(name = "seq_location_id", sequenceName = "seq_location_id", allocationSize = 1)
  private Long id;
  
  private String street;
  private String number;
  private String letter;
  private String postal;
  private String city;
  //private Integer area;
  private Double latitude;
  private Double longitude;

  
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "call_id", referencedColumnName = "id")
  private CallEntity call;
}
