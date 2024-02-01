package com.example.quizzes.service;

import com.example.quizzes.dao.model.Question;

import java.util.List;

public interface QuestionService {
    List<Question> findAllByQuizId(String id, Integer pageNumber,
                                   Integer pageSize);

    String save(Question question);

}
