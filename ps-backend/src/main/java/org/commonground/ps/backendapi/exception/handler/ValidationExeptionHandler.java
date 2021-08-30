package org.commonground.ps.backendapi.exception.handler;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.validation.FieldError;

@ControllerAdvice
public class ValidationExeptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleMethodArgumentNotValidException(
    MethodArgumentNotValidException ex) {
      List<FieldValue> fieldValues = new ArrayList<>();
      ex.getBindingResult().getAllErrors().forEach((error) -> {
        fieldValues.add(new FieldValue(((FieldError) error).getField(), error.getDefaultMessage()));
      });

      return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST, "Validation error", fieldValues), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiError> handleConstraintViolationException(
    ConstraintViolationException ex) {
      Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
      List<FieldValue> fieldValues = new ArrayList<>();
      constraintViolations.forEach(constraintViolation -> {
        fieldValues.add(new FieldValue(stripPath(constraintViolation.getPropertyPath().toString()), constraintViolation.getMessage()));
      });
      return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST, "Validation error", fieldValues), HttpStatus.BAD_REQUEST);
  }
  
  public String stripPath(String path) {
    int index = path.lastIndexOf(".");
    if (path.length() > 0 && index > 0) {
      return path.substring(index + 1, path.length());
    }
    return path;
  }
}