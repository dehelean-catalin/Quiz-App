package com.example.questions;

import java.util.List;

public interface QuestionService {
    List<Question> findAll();
    Question findById(String id);
    String save(Question question);
    String deleteById(String id);
}
