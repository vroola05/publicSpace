package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_button_condition")
public class PageButtonConditionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_page_button_condition_id")
  @SequenceGenerator(name = "seq_page_button_condition_id", sequenceName = "seq_page_button_condition_id", allocationSize = 1)
  private Long id;
  
  private String field;
  private String operator;
  private String value;

  @ManyToOne()
  @JoinColumn(name="page_button_id", referencedColumnName = "id")
   private PageButtonEntity pageButton;
}
