package com.example.quizzes.controller;

import com.example.quizzes.dao.model.Question;
import com.example.quizzes.service.QuestionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/questions")
@Tag(name = "Question", description = "Questions management apis")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public String save(@RequestBody Question question) {
        return questionService.save(question);
    }
}
