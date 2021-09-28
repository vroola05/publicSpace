package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_overview_status")
public class PageOverviewStatusEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_overview_status_id")
  @SequenceGenerator(name = "seq_page_overview_status_id", sequenceName = "seq_page_overview_status_id", allocationSize = 1)
  private Long id;

  @ManyToOne()
  @JoinColumn(name="status_id", referencedColumnName = "id")
  private StatusEntity status;

  @ManyToOne()
  @JoinColumn(name="page_overview_id", referencedColumnName = "id")
   private PageOverviewEntity pageOverview;
}
