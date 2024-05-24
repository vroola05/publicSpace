package org.commonground.ps.backendapi.jpa.entities;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "page_type")
public class PageTypeEntity {
  @Id
  private Long id;
  private String name;
}
