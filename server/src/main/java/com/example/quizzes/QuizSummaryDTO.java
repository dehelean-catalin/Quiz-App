package com.example.quizzes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizSummaryDTO {
    private String id;
    private String title;
    private Difficulty difficulty;
    private String description;
    private Integer duration;
    private Long numberOfQuestions;
    private Integer questionsPerPage;
    private Boolean allowBack;
}
