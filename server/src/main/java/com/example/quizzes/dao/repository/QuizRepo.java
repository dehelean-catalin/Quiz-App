package com.example.quizzes.dao.repository;

import com.example.quizzes.dao.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepo extends JpaRepository<Quiz, String> {
}
