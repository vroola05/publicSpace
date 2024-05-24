package org.commonground.ps.backendapi.jpa.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import org.locationtech.jts.geom.Geometry;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;



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
