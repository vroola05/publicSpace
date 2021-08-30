package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "category")
public class CategoryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_category_id")
  @SequenceGenerator(name = "seq_category_id", sequenceName = "seq_category_id", allocationSize = 1)
  private Long id;
  private String name;
  private Date startDate;
  private Date endDate;
  private Boolean active;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_category_id", referencedColumnName = "id")
  private MainCategoryEntity mainCategory;

  @ManyToOne()
  @JoinColumn(name = "group_id", referencedColumnName = "id")
  private GroupEntity group;
}
