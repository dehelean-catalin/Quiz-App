package com.example.questions;

import java.util.List;

public interface QuestionService {
    List<Question> findAllByQuizId(String id, Integer pageNumber,
                                   Integer pageSize);

    Question findById(String id);


    String save(Question question);

    String deleteById(String id);
}
