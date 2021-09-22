package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_overview")
public class PageOverviewEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_id")
  @SequenceGenerator(name = "seq_page_id", sequenceName = "seq_page_id", allocationSize = 1)
  private Long id;
  private String name;
  private String route;
  private Boolean toggle;
  private Boolean priority;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "page_id", nullable = false)
  private PageEntity page;
}
