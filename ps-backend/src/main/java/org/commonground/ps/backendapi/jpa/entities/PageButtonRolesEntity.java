package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_button_roles")
public class PageButtonRolesEntity {
  @Id
  private Long id;
  private boolean allow;

  @ManyToOne()
  @JoinColumn(name="role_id", referencedColumnName = "id")
   private PageButtonEntity role;

  @ManyToOne()
  @JoinColumn(name="page_button_id", referencedColumnName = "id")
   private PageButtonEntity pageButton;
}
