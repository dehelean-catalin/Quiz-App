package com.example.attempts.controllers;

import com.example.attempts.dto.AttemptResultDto;
import com.example.attempts.dto.CreateAttemptResponseDto;
import com.example.attempts.dto.PaginatedQuestionsDto;
import com.example.attempts.service.AttemptService;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/attempts")
public class AttemptController {

    private final AttemptService attemptService;

    public AttemptController(AttemptService attemptService) {
        this.attemptService = attemptService;
    }

    @GetMapping("/{id}")
    public AttemptResultDto getQuizResult(@PathVariable String id) throws BadRequestException {
        return attemptService.findQuizResult(id);
    }

    @GetMapping("/{attemptId}/questions/{id}")
    public PaginatedQuestionsDto findPaginatedQuestions(@PathVariable String attemptId,
                                                        @PathVariable String id,
                                                        @RequestParam String page) throws BadRequestException {
        return attemptService.findPaginatedQuestions(id, attemptId, page);
    }

    @PostMapping("/{id}")
    public CreateAttemptResponseDto createAttempt(@PathVariable String id) throws BadRequestException {
        return attemptService.save(id);
    }

    @PostMapping("/{attemptId}/questions")
    public String saveAnswers(@PathVariable String attemptId,
                              @RequestParam String page,
                              @RequestBody Map<String, List<String>> formValues) throws BadRequestException {

        return attemptService.saveAnswers(attemptId, formValues, page);
    }

    @PostMapping("/{attemptId}/finish")
    public String closeAttempt(@PathVariable String attemptId,
                               @RequestParam String page,
                               @RequestBody Map<String, List<String>> formValues) throws BadRequestException {

        return attemptService.closeAttempt(attemptId, formValues, page);
    }
}
