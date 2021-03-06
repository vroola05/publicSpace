package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.locationtech.jts.geom.Geometry;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;



import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "company")
public class CompanyEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_company_id")
  @SequenceGenerator(name = "seq_company_id", sequenceName = "seq_company_id", allocationSize = 1)
  private Long id;
  private String name;
  private Long code;
  private Integer srid;

  @Column(name = "center")
  private Geometry center;
}
