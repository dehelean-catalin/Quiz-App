package com.example.attemps;

import org.apache.coyote.BadRequestException;

import java.util.List;
import java.util.Map;

public interface AttemptService {

    QuizResultResponse findQuizResult(String id) throws BadRequestException;

    String save(String attempt);

    String saveAnswers(String id, Map<String, List<String>> answers) throws BadRequestException;
}
