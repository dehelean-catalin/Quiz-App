package com.example.attempts.service;

import com.example.attempts.dao.Attempt;
import com.example.attempts.dto.CreateAttemptResponse;
import com.example.attempts.dto.PaginatedQuestionsDto;
import com.example.attempts.dto.QuizResultResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface AttemptService {
    Attempt findById(String attemptId) throws BadRequestException;

    QuizResultResponse findQuizResult(String id) throws BadRequestException;

    PaginatedQuestionsDto findPaginatedQuestions(@PathVariable String id,
                                                 @PathVariable String attemptId,
                                                 @RequestParam String page) throws BadRequestException;

    CreateAttemptResponse save(String attempt) throws BadRequestException;

    String saveAnswers(String attemptId, Map<String, List<String>> answers, String page) throws BadRequestException;

    String closeAttempt(String attemptId, Map<String, List<String>> answers, String page) throws BadRequestException;
}
