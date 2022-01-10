package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.OrderColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Audited
@EntityListeners(AuditingEntityListener.class)
@Table(name = "main_category")
@NaturalIdCache
@Cache(
    usage = org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE
)
public class MainCategoryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_maincategory_id")
  @SequenceGenerator(name = "seq_maincategory_id", sequenceName = "seq_maincategory_id", allocationSize = 1)
  private Long id;
  
  @NaturalId
  @OrderColumn
  private String name;
  
  @OneToMany(targetEntity = CategoryEntity.class, mappedBy = "mainCategory", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @OrderBy("name ASC")
  private List<CategoryEntity> categories = new ArrayList<>();

  @ManyToOne()
  @JoinColumn(name="domain_id", referencedColumnName = "id")
  private DomainEntity domain;

  @OneToMany(
    mappedBy = "mainCategory",
    cascade = CascadeType.MERGE,
    orphanRemoval = true
  )
  private List<ContractMainCategoryEntity> contractMainCategory = new ArrayList<>();


  @Override
  public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      MainCategoryEntity mainCategoryEntity = (MainCategoryEntity) o;
      return Objects.equals(name, mainCategoryEntity.name);
  }

  @Override
  public int hashCode() {
      return Objects.hash(name);
  }
}
