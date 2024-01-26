package com.example.attempts.exceptions;

import org.apache.coyote.BadRequestException;

public class AttemptNotFoundException extends BadRequestException {
    public AttemptNotFoundException() {
        super("Attempt not found");
    }
}
