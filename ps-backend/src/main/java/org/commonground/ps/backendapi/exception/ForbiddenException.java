package org.commonground.ps.backendapi.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason="Not allowed")
public class ForbiddenException extends RuntimeException {}


