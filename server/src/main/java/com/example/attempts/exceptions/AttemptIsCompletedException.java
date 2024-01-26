package com.example.attempts.exceptions;

import org.apache.coyote.BadRequestException;

public class AttemptIsCompletedException extends BadRequestException {
    public AttemptIsCompletedException() {
        super("Attempt is completed");
    }
}
