package com.example.questions;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Question, String> {
    List<Question> findAllById(String id, Pageable pageable);

    Long countByQuizId(String quizId);
}
