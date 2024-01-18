package com.example.attemps;

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
    public QuizResultResponse getQuizResult(@PathVariable String id) throws BadRequestException {
        return attemptService.findQuizResult(id);
    }

    @PostMapping("/{id}")
    public String save(@PathVariable String id) {
        return attemptService.save(id);
    }

    @PostMapping("/{attemptId}/questions")
    public String saveQuestionsAnswers(@PathVariable String attemptId, @RequestBody Map<String,
            List<String>> attemptQuestionsAnswers) throws BadRequestException {

        return attemptService.saveAnswers(attemptId, attemptQuestionsAnswers);
    }

}
