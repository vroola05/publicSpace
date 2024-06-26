package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

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

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_category_id", referencedColumnName = "id")
  private MainCategoryEntity mainCategory;

  @ManyToOne()
  @JoinColumn(name = "group_id", referencedColumnName = "id")
  private GroupEntity group;

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (object == null || getClass() != object.getClass()) {
      return false;
    }
    CategoryEntity o = (CategoryEntity) object;
    return id == o.id;
  }
}
