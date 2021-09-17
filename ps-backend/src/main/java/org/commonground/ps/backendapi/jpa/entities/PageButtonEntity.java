package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_button")
public class PageButtonEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_button_id")
  @SequenceGenerator(name = "seq_page_button_id", sequenceName = "seq_page_button_id", allocationSize = 1)
  private Long id;
  private String location;
  private String name;
  private String route;

  @Column(nullable = false)
  private Long sort;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "page_id", nullable = false)
  private PageEntity page;

  @ManyToOne(optional = true, fetch = FetchType.EAGER)
  ActionTypeEntity actionType;

  @ManyToOne(fetch = FetchType.EAGER)
  PageButtonTypeEntity buttonType;

  @OneToMany(targetEntity = PageButtonRolesEntity.class, mappedBy = "pageButton", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private List<PageButtonRolesEntity> roles = new ArrayList<>();
  
}
