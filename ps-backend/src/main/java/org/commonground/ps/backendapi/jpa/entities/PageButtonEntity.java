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
  private Long id;
  private String location;
  private String name;
  private String route;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "page_id", nullable = false)
  private PageEntity page;

  @ManyToOne(fetch = FetchType.EAGER)
  ActionTypeEntity actionType;

  @ManyToOne(fetch = FetchType.EAGER)
  PageButtonTypeEntity buttonType;

  @OneToMany(targetEntity = PageButtonRolesEntity.class, mappedBy = "pageButton", fetch = FetchType.EAGER)
  private List<PageButtonRolesEntity> roles = new ArrayList<>();
  
}
