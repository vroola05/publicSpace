package org.commonground.ps.backendapi.jpa.entities;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_button_type")
public class PageButtonTypeEntity {
  @Id
  private Long id;
  private String name;

}
