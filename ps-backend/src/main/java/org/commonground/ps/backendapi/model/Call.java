package org.commonground.ps.backendapi.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Call {
  private Long id;
  @NotNull(message = "Waarde is verplicht")
  @Size(min = 1, max = 500, message = "Waarde is minimaal 1 en maximaal 500 tekens")
  private String description;
  //@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss Z", timezone = "Europe/Amsterdam")
  private Date dateCreated;
  //@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss Z", timezone = "Europe/Amsterdam")
  private Date dateEnded;
  private String casenumber;

  @Valid
  @NotNull(message = "Waarde is verplicht")
  private MainCategory mainCategory;

  @Valid
  @NotNull(message = "Waarde is verplicht")
  private Location location;
  @Valid
  private Person person;
  private Domain domain;

  private Status status;

  private Group group;
  private User user;

  private List<Order> orders = new ArrayList<>();
  private List<Note> notes = new ArrayList<>();
}
