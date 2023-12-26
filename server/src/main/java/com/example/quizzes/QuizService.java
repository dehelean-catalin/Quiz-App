package com.example.quizzes;

import org.apache.coyote.BadRequestException;

import java.util.List;

public interface QuizService {
    List<Quiz> findAll();

    Quiz findById(String id);

    String save(QuizDTO quiz) throws BadRequestException;

}
