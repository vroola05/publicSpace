package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Audited
@EntityListeners(AuditingEntityListener.class)
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
}
