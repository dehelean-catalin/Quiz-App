package com.example.quizzes.service;

import com.example.quizzes.dao.model.Quiz;
import com.example.quizzes.dao.repository.QuizRepo;
import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuizSummaryDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.example.quizzes.dto.converter.QuizConverter.createQuizDtoToQuiz;
import static com.example.quizzes.dto.converter.QuizConverter.quizToQuizSummaryDTO;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepo quizRepo;

    public QuizServiceImpl(QuizRepo quizRepo) {
        this.quizRepo = quizRepo;
    }

    @Override
    public QuizSummaryDTO findById(String id) throws BadRequestException {

        Quiz quiz = quizRepo.findById(id).orElseThrow(() -> new BadRequestException("Quiz with id " + id +
                " was not found"));

        return quizToQuizSummaryDTO(quiz);
    }

    @Override
    public List<QuizSummaryDTO> findAllSummary() {
        List<Quiz> quizzes = quizRepo.findAll();
        List<QuizSummaryDTO> quizSummaryList = new ArrayList<>();

        quizzes.forEach((quiz) -> quizSummaryList.add(quizToQuizSummaryDTO(quiz)));

        return quizSummaryList;
    }

    @Override
    public String save(CreateQuizDTO quizDto) throws BadRequestException {

        Quiz quiz = createQuizDtoToQuiz(quizDto);

        Quiz savedQuiz = quizRepo.save(quiz);

        return savedQuiz.getId();
    }
}
