package com.example.quizzes.service;

import com.example.quizzes.dao.Quiz;
import com.example.quizzes.dao.QuizRepo;
import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuizSummaryDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.example.quizzes.service.QuizHelpers.convertQuizDtoToQuiz;
import static com.example.quizzes.service.QuizHelpers.convertQuizToQuizSummaryDTO;

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

        return convertQuizToQuizSummaryDTO(quiz);
    }

    @Override
    public List<QuizSummaryDTO> findAllSummary() {
        List<Quiz> quizzes = quizRepo.findAll();
        List<QuizSummaryDTO> quizSummaryList = new ArrayList<>();

        quizzes.forEach((quiz) -> quizSummaryList.add(convertQuizToQuizSummaryDTO(quiz)));

        return quizSummaryList;
    }

    @Override
    public String save(CreateQuizDTO quizDto) throws BadRequestException {

        Quiz quiz = convertQuizDtoToQuiz(quizDto);

        Quiz savedQuiz = quizRepo.save(quiz);

        return savedQuiz.getId();
    }
}
