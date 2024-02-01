package com.example.attempts.dao.repository;

import com.example.quizzes.dao.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepo extends JpaRepository<Answer, String> {
}
