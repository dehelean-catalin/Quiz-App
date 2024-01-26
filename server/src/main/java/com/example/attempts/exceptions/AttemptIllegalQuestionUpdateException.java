package com.example.attempts.exceptions;

import org.apache.coyote.BadRequestException;

public class AttemptIllegalQuestionUpdateException extends BadRequestException {
    public AttemptIllegalQuestionUpdateException() {
        super("Not allowed to update previous questions");
    }
}
