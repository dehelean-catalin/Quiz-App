package com.example.quizzes.dao.repository;

import com.example.quizzes.dao.model.Question;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Question, String> {
    List<Question> findAllByQuizId(String id, Pageable pageable);

}
