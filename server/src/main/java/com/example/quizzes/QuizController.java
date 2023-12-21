package com.example.quizzes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/quizzes")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping()
    public ResponseEntity<List<Quiz>> findAll() {
        return ResponseEntity.ok(quizService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> findById(@PathVariable String id) {
        return ResponseEntity.ok(quizService.findById(id));
    }

    @PostMapping()
    public ResponseEntity<String> save(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.save(quiz));
    }
}
