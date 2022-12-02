package org.commonground.ps.backendapi.jpa.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

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

  @OneToOne(targetEntity = LocationEntity.class, mappedBy = "call", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private LocationEntity location;

  @OneToOne(cascade = CascadeType.ALL, mappedBy = "call")
  private PersonEntity person;

  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="domain_id", referencedColumnName = "id")
  private DomainEntity domain;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "status_id", referencedColumnName = "id")
  private StatusEntity status;

  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="user_id", referencedColumnName = "id")
  private UserEntity user;

  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="group_id", referencedColumnName = "id")
  private GroupEntity group;

  @OneToMany(targetEntity = OrderEntity.class, mappedBy = "call", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<OrderEntity> orders;

  @OrderBy("dateCreated DESC")
  @OneToMany(targetEntity = NoteEntity.class, mappedBy = "call", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<NoteEntity> notes = new ArrayList<>();
}
