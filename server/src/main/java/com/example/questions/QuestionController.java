package com.example.questions;

import com.example.attempts.service.AttemptService;
import com.example.quizzes.service.QuizService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/questions")
@Tag(name = "Question", description = "Questions management apis")
public class QuestionController {

    private final QuestionService questionService;
    private final QuizService quizService;

    private final AttemptService attemptService;

    public QuestionController(QuestionService questionService, QuizService quizService, AttemptService attemptService) {
        this.questionService = questionService;
        this.quizService = quizService;
        this.attemptService = attemptService;
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public String save(@RequestBody Question question) {
        return questionService.save(question);
    }
}
