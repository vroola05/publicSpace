package org.commonground.ps.backendapi.jpa.entities;

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

  @ManyToOne(fetch = FetchType.EAGER)
  private DomainEntity domain;

  @ManyToOne(fetch = FetchType.EAGER)
  PageTypeEntity pageType;
}
