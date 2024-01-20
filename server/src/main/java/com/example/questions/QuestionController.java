package com.example.questions;

import com.example.quizzes.QuizService;
import com.example.quizzes.QuizSummaryDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
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


    @GetMapping("/{id}")
    public QuestionPerPageResponse findAllByQuizId(@PathVariable String id, @RequestParam String page,
                                                   @RequestParam String size) {

        int numericPage = Integer.parseInt(page);
        int numericSize = Integer.parseInt(size);

        List<Question> questions = questionService.findAllByQuizId(id, numericPage, numericSize);
        QuizSummaryDTO quizSummary = quizService.findById(id);

        ModelMapper modelMapper = new ModelMapper();

        List<QuestionResponse> questionDTOList = questions.stream().map(
                question -> modelMapper.map(question, QuestionResponse.class)).toList();

        QuestionPerPageResponse questionPerPageResponse =
                new QuestionPerPageResponse(quizSummary.getAllowBack());
        questionPerPageResponse.getQuestions().addAll(questionDTOList);

        if (quizSummary.getNumberOfQuestions() <= (numericPage + 1) * numericSize) {
            questionPerPageResponse.setFinish(true);
        }

        return questionPerPageResponse;
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public String save(@RequestBody Question question) {
        return questionService.save(question);
    }
}
