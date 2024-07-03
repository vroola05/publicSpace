package org.commonground.ps.backendapi.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;

import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason="Bad request")
public class GenericException extends RuntimeException {

  public List<FieldValue> errors;

  public GenericException() {}

  public GenericException(String message) {
    super(message);
  }

  public GenericException(String message, List<FieldValue> errors) {
    super(message);
    this.errors = errors;
  }

  public void addError(FieldValue error) {
    if (this.errors == null) {
      this.errors = new ArrayList<>();
    }
    this.errors.add(error);
  }

  public List<FieldValue> getErrors() {
    return this.errors;
  }
}


