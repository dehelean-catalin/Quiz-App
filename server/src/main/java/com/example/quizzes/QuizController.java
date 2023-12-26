package com.example.quizzes;

import com.example.utils.ResponseMessage;
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
    public List<Quiz> findAll() {
        return quizService.findAll();
    }

    @GetMapping("/{id}")
    public Quiz findById(@PathVariable String id) {
        return quizService.findById(id);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseMessage save(@Valid @RequestBody QuizDTO quiz) throws BadRequestException {

        String message = quizService.save(quiz);
        return new ResponseMessage(message);
    }
}
