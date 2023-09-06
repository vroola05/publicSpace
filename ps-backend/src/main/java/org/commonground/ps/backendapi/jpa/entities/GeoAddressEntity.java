package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.*;

import org.locationtech.jts.geom.Geometry;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class GeoAddressEntity {
  @Id
  private Long id;
  private String type;
  private Boolean active;
  private Date startDate;
  private Date endDate;
  private Integer government;
  private String district;
  private String street;
  private Integer number;
  private String letter;
  private String addition;
  private String postal;
  private String city;

  private Integer srid;

  @Column(name = "geo")
  private Geometry geo;
}
