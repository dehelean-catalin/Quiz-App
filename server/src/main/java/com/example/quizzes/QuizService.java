package com.example.quizzes;

import org.apache.coyote.BadRequestException;

import java.util.List;

public interface QuizService {

    QuizSummaryDTO findById(String id) throws BadRequestException;

    List<QuizSummaryDTO> findAllSummary();

    String save(CreateQuizDTO quiz) throws BadRequestException;

}
