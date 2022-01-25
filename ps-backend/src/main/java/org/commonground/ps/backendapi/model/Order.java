package org.commonground.ps.backendapi.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Order {
    private Long id;
    @NotNull(message = "Waarde is verplicht")
    @Size(min = 1, max = 500, message = "Waarde is minimaal 1 en maximaal 500 tekens")
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss Z", timezone = "Europe/Amsterdam")
    private Date dateCreated;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss Z", timezone = "Europe/Amsterdam")
    private Date dateEnded;

    private Domain contractorDomain;
    private List<Category> categories = new ArrayList<>();
    
    private Status status;
}
