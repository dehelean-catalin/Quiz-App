package com.example.attemps;

import org.apache.coyote.BadRequestException;

import java.util.List;
import java.util.Map;

public interface AttemptService {
    Attempt findById(String attemptId) throws BadRequestException;

    QuizResultResponse findQuizResult(String id) throws BadRequestException;

    String save(String attempt) throws BadRequestException;

    String saveAnswers(String id, Map<String, List<String>> answers) throws BadRequestException;

    String finishAttempt(String id, Map<String, List<String>> answers) throws BadRequestException;
}
