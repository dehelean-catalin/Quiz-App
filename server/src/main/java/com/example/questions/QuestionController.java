package com.example.questions;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/questions")
@Tag(name = "Question", description = "Questions management apis")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Question>> findAll() {
        return ResponseEntity.ok(questionService.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<String> save(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.save(question));
    }
}
