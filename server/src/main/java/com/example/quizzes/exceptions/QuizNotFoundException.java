package com.example.quizzes.exceptions;

import org.apache.coyote.BadRequestException;

public class QuizNotFoundException extends BadRequestException {

    public QuizNotFoundException() {
        super("Quiz not found");
    }
}
