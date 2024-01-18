package com.example.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizSummaryDTO {
    private String id;
    private String title;
    private String difficulty;
    private String description;
    private Integer duration;
    private Long numberOfQuestions;
    private Integer questionsPerPage;
}
