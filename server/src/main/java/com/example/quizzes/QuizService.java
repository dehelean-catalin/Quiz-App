package com.example.quizzes;

import org.apache.coyote.BadRequestException;

import java.util.List;

public interface QuizService {

    QuizSummaryDTO findById(String id);

    List<QuizSummaryDTO> findAllSummary();

    String save(CreateQuizDTO quiz) throws BadRequestException;

}
