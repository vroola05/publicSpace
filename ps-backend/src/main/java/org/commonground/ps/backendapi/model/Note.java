package org.commonground.ps.backendapi.model;

import java.util.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Note {

    private Long id;
    @NotNull(message = "Waarde is verplicht")
    @Size(min = 1, max = 5000, message = "Waarde is minimaal 1 en maximaal 5000 tekens")
    private String content;
    private NoteType type;
    private User user;
    private Date dateCreated;
    private boolean visible;
}
