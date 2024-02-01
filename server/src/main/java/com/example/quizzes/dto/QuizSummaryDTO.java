package com.example.quizzes.dto;

import com.example.quizzes.dao.model.QuizDifficulty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuizSummaryDTO {
    private String id;
    private String title;
    private QuizDifficulty quizDifficulty;
    private String description;
    private int duration;
    private int numberOfQuestions;
    private int questionsPerPage;
    private boolean allowBack;
}
