package com.example.questions;

import com.example.quizzes.QuizService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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


    @GetMapping("/{id}")
    public List<QuestionDTO> findAllByQuizId(@PathVariable String id,
                                             @RequestParam String page,
                                             @RequestParam String size) {
        ModelMapper modelMapper = new ModelMapper();
        List<Question> questions = questionService.findAllByQuizId(id,
                Integer.parseInt(page),
                Integer.parseInt(size));
        List<QuestionDTO> questionDTOList =
                questions.stream().map((question) -> modelMapper.map(question,
                        QuestionDTO.class)).collect(Collectors.toList());
        
        return questionDTOList;
    }

    @PostMapping("/")
    public ResponseEntity<String> save(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.save(question));
    }
}
