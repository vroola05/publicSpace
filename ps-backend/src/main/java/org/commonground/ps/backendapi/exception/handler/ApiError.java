package org.commonground.ps.backendapi.exception.handler;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiError {

  private Integer status;
  private LocalDateTime timestamp;
  private HttpStatus error;
  private String message;
  private List<FieldValue> errors;

  public ApiError(HttpStatus error, String message, List<FieldValue> errors) {
      this.status = error.value();
      this.error = error;
      this.message = message;
      this.errors = errors;
      this.timestamp = LocalDateTime.now(ZoneOffset.UTC);
  }
}