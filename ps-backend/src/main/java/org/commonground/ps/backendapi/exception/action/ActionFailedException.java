package org.commonground.ps.backendapi.exception.action;

import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;

import org.commonground.ps.backendapi.exception.handler.FieldValue;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason="Bad request")
public class ActionFailedException extends RuntimeException {

  public List<FieldValue> errors;

  public ActionFailedException() {}

  public ActionFailedException(String message) {
    super(message);
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


