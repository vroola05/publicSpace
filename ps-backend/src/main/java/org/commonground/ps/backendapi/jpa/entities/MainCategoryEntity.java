package org.commonground.ps.backendapi.jpa.entities;

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
@Table(name = "main_category")
public class MainCategoryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_maincategory_id")
  @SequenceGenerator(name = "seq_maincategory_id", sequenceName = "seq_maincategory_id", allocationSize = 1)
  private Long id;
  private String name;
  
  @ManyToOne()
  @JoinColumn(name="company_id", referencedColumnName = "id")
  private CompanyEntity company;
}
