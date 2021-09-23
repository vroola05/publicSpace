package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_overview_column")
public class PageOverviewColumnEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_overview_column_id")
  @SequenceGenerator(name = "seq_page_overview_column_id", sequenceName = "seq_page_overview_column_id", allocationSize = 1)
  private Long id;
  private String name;
  private String title;
  private String type;
  private String filter;
  private String css;
  private String mobile;
  private Long sort;

  @ManyToOne()
  @JoinColumn(name="page_overview_id", referencedColumnName = "id")
   private PageOverviewEntity pageOverview;
}
