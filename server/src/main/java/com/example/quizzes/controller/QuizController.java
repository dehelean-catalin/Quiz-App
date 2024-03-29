package com.example.quizzes.controller;

import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuizSummaryDTO;
import com.example.quizzes.service.QuizService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/quizzes")
@Tag(name = "Quiz", description = "Quiz management apis")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping()
    public List<QuizSummaryDTO> findAllSummary() {
        return quizService.findAllSummary();
    }

    @GetMapping("/{id}")
    public QuizSummaryDTO findById(@PathVariable String id) throws BadRequestException {
        return quizService.findById(id);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public String createQuiz(@Valid @RequestBody CreateQuizDTO quiz) throws BadRequestException {
        return quizService.save(quiz);
    }

}
