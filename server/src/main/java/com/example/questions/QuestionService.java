package com.example.questions;

import org.apache.coyote.BadRequestException;

import java.util.List;

public interface QuestionService {
    List<Question> findAllByQuizId(String id, Integer pageNumber,
                                   Integer pageSize);

    Question findById(String id) throws BadRequestException;

    String save(Question question);

    String deleteById(String id);
}
