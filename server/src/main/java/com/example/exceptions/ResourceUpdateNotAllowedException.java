package com.example.exceptions;

public class ResourceUpdateNotAllowedException extends RuntimeException {
    
    public ResourceUpdateNotAllowedException(String quizAttemptIsCompleted) {
        super(quizAttemptIsCompleted);
    }
}
