package com.example.exceptions;

import org.apache.coyote.BadRequestException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleResourceNotFoundException(ResourceNotFoundException ex) {

        return new ErrorMessage(HttpStatus.NOT_FOUND.value(), "Resource not found: " + ex.getMessage());
    }

    @ExceptionHandler({BadRequestException.class, BadCredentialsException.class, HttpClientErrorException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleBadRequestException(BadRequestException ex) {

        return new ErrorMessage(HttpStatus.BAD_REQUEST.value(), "Bad request: " + ex.getMessage());
    }

    @ExceptionHandler({ResourceUpdateNotAllowedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleForbiddenException(ResourceUpdateNotAllowedException exception) {

        return new ErrorMessage(HttpStatus.FORBIDDEN.value(),
                "Forbidden: " + exception.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleException(Exception ex) {

        return new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An unexpected error occurred: " + ex.getMessage());
    }


}
