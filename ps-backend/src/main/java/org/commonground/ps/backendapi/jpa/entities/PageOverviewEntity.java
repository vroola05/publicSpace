package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_overview")
public class PageOverviewEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_overview_id")
  @SequenceGenerator(name = "seq_page_overview_id", sequenceName = "seq_page_overview_id", allocationSize = 1)
  private Long id;
  private String name;
  private String icon;
  private String route;
  private Boolean toggle;
  private Boolean priority;
  private Boolean personal;
  private Long size;
  private Long sort;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "page_id", nullable = false)
  private PageEntity page;

  @OneToMany(targetEntity = PageOverviewColumnEntity.class, mappedBy = "pageOverview", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<PageOverviewColumnEntity> columns = new ArrayList<>();

  @OneToMany(targetEntity = PageOverviewStatusEntity.class, mappedBy = "pageOverview", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<PageOverviewStatusEntity> statusses = new ArrayList<>();

  @OneToMany(targetEntity = PageButtonEntity.class, mappedBy = "pageOverview", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @OrderBy("sort ASC")
  private List<PageButtonEntity> pageButtons = new ArrayList<>();
}
