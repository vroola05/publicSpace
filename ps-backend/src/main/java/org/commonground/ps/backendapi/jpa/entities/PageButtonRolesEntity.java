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
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_button_role_id")
  @SequenceGenerator(name = "seq_page_button_role_id", sequenceName = "seq_page_button_role_id", allocationSize = 1)
  private Long id;
  private boolean allow;

  @ManyToOne()
  @JoinColumn(name="role_id", referencedColumnName = "id")
  private RolesEntity role;

  @ManyToOne()
  @JoinColumn(name="page_button_id", referencedColumnName = "id")
   private PageButtonEntity pageButton;
}
