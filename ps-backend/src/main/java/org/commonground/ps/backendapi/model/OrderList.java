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
@Subselect( ""
        + "SELECT o.id, mcat.name || ' / ' || cat.name as category, o.description, c.priority, c.casenumber, c.notification, o.domain_id, o.user_id, s.id as status_id, o.date_created, o.date_ended, s.name as status, l.street || COALESCE(' ' || l.number, '') || ', ' || COALESCE(' ' || l.postal, '') || ' ' || l.city as location, l.street, l.number, l.postal, l.city, "
        + "u.name as user, g.name as group, (select array_to_string(array_agg(distinct g.name), ', ') from orders_category oc, category c, groups g where o.id = oc.order_id and c.id = oc.category_id and g.id = c.group_id) as groups "
        + "FROM orders o INNER JOIN groups g ON o.group_id = g.id INNER JOIN status s ON o.status_id = s.id LEFT JOIN users u ON o.user_id = u.id, "
        + "call c INNER JOIN location l ON c.id = l.call_id INNER JOIN category cat ON c.category_id = cat.id INNER JOIN  main_category mcat ON cat.main_category_id = mcat.id where c.id = o.call_id")
public class OrderList {  
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
  
  @JsonIgnore
  private Long userId;

  @JsonIgnore
  private Long statusId;

  @JsonIgnore
  private Long domainId;

  private String group;
  private String groups;
}
