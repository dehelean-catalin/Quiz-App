package com.example.questions;

import com.example.quizzes.QuizService;
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
    private final QuizService quizService;

    public QuestionController(QuestionService questionService, QuizService quizService) {
        this.questionService = questionService;
        this.quizService = quizService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Question>> findAll() {
        return ResponseEntity.ok(questionService.findAll());
    }

    @GetMapping("/{id}")
    public Question findById(@PathVariable String id) {
        return questionService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<String> save(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.save(question));
    }
}
