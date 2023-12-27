package com.example.quizzes;

import com.example.dtos.CreateQuizDTO;
import com.example.dtos.QuestionDTO;
import com.example.dtos.QuizSummaryDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QuizService {
    List<Quiz> findAll();

    Quiz findById(String id);

    List<QuizSummaryDTO> findAllSummary();

    List<QuestionDTO> findQuestionsByPage(String id, Pageable pageable);

    String save(CreateQuizDTO quiz) throws BadRequestException;

}
