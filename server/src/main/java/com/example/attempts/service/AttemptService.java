package com.example.attempts.service;

import com.example.attempts.dao.model.Attempt;
import com.example.attempts.dto.AttemptResultDto;
import com.example.attempts.dto.CreateAttemptResponseDto;
import com.example.attempts.dto.PaginatedQuestionsDto;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface AttemptService {
    Attempt findById(String attemptId) throws BadRequestException;

    AttemptResultDto findQuizResult(String id) throws BadRequestException;

    PaginatedQuestionsDto findPaginatedQuestions(@PathVariable String id,
                                                 @PathVariable String attemptId,
                                                 @RequestParam String page) throws BadRequestException;

    CreateAttemptResponseDto save(String attempt) throws BadRequestException;

    String saveAnswers(String attemptId, Map<String, List<String>> answers, String page) throws BadRequestException;

    String closeAttempt(String attemptId, Map<String, List<String>> answers, String page) throws BadRequestException;
}
