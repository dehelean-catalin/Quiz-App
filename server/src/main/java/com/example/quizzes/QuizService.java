package com.example.quizzes;

import java.util.List;

public interface QuizService {
    List<Quiz> findAll();

    Quiz findById(String id);

    String save(Quiz quiz);

}
