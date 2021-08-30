package org.commonground.ps.backendapi.exception;

public class SecurityException extends Exception {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public SecurityException(String message) {
      super(message);
  }

  public SecurityException(String message, Throwable err) {
    super(message, err);
}
}