package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Immutable
@Subselect("SELECT id, "
+ "street, number, letter, postal, city, ST_X(ST_Transform(ST_SetSRID(geo, coord), coord)) as x, ST_Y(ST_Transform(ST_SetSRID(geo, coord), coord)) as y, "
+ "ST_X(ST_Transform(ST_SetSRID(geo, coord), 4326)) as latitude, ST_Y(ST_Transform(ST_SetSRID(geo, coord), 4326)) as longitude "
+ "FROM public.geo_address")
public class GeoAddressEntity {
  @Id
  private Long id;
  private String street;
  private String number;
  private String letter;
  private String postal;
  private String city;
  private Double x;
  private Double y;
  private Double latitude;
  private Double longitude;
}
