package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page")
public class PageEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_id")
  @SequenceGenerator(name = "seq_page_id", sequenceName = "seq_page_id", allocationSize = 1)
  private Long id;
  private String name;
  private String layoutType;

  @ManyToOne(fetch = FetchType.EAGER)
  private DomainEntity domain;

  @ManyToOne(fetch = FetchType.EAGER)
  PageTypeEntity pageType;

  @OneToMany(targetEntity = PageButtonEntity.class, mappedBy = "page", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @OrderBy("sort ASC")
  private List<PageButtonEntity> pageButtons = new ArrayList<>();

  @OrderBy("sort ASC")
  @OneToMany(targetEntity = PageOverviewEntity.class, mappedBy = "page", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<PageOverviewEntity> pageOverview = new ArrayList<>();
}
