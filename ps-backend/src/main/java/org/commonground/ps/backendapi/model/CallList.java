package org.commonground.ps.backendapi.model;


import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Immutable
@Subselect("" 
        + "SELECT "
        + "c.id, c.description, c.priority, c.casenumber, c.status_id as status_id, s.name as status, g.name as group, g.id as group_id, c.notification, c.date_created, c.date_ended, c.domain_id, "
        + "mcat.name || ' / ' || cat.name as category, "
        + "l.street || COALESCE(' ' || l.number, '') || ', ' || COALESCE(' ' || l.postal, '') || ' ' || l.city as location, l.street, l.number, l.postal, l.city, c.user_id, u.name as user "
        + "FROM "
        + "call c "
        + "INNER JOIN location l ON c.id = l.call_id "
        + "INNER JOIN category cat ON c.category_id = cat.id "
        + "INNER JOIN groups g ON c.group_id = g.id "
        + "INNER JOIN  main_category mcat ON cat.main_category_id = mcat.id "
        + "INNER JOIN status s ON c.status_id = s.id "
        + "LEFT JOIN users u ON c.user_id = u.id ")
public class CallList {
  @Id
  private Long id;
  private String category;
  private String description;
  private String location;
  private String street;
  private String number;
  private String postal;
  private String city;
  
  private String casenumber;
  private String status;
  private String notification;
  private boolean priority;
  private Date dateCreated;
  private Date dateEnded;
  private String user;
  private String group;
  
  @JsonIgnore
  private Long userId;

  @JsonIgnore
  private Long groupId;

  @JsonIgnore
  private Long statusId;

  @JsonIgnore
  private Long domainId;
}
