package org.commonground.ps.backendapi.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason="Not found")
public class NotFoundException extends RuntimeException {}


