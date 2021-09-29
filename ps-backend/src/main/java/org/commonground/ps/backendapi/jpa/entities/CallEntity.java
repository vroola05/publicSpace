package org.commonground.ps.backendapi.jpa.entities;

import java.util.Date;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "call")
public class CallEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_call_id")
  @SequenceGenerator(name = "seq_call_id", sequenceName = "seq_call_id", allocationSize = 1)
  private Long id;
  private String description;
  private Date dateCreated;
  private Date dateEnded;
  private String casenumber;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "category_id", referencedColumnName = "id")
  private CategoryEntity category;

  @OneToOne(cascade = CascadeType.ALL, mappedBy = "call")
  private LocationEntity location;

  @OneToOne(cascade = CascadeType.ALL, mappedBy = "call")
  private PersonEntity person;

  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="company_id", referencedColumnName = "id")
  private CompanyEntity company;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "status_id", referencedColumnName = "id")
  private StatusEntity status;

  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="user_id", referencedColumnName = "id")
  private UserEntity user;
}
