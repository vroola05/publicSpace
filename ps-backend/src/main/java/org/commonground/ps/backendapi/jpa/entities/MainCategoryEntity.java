package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

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
