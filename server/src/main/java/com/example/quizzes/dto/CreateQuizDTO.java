package com.example.quizzes.dto;

import com.example.quizzes.dao.model.QuizDifficulty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateQuizDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @Enumerated(EnumType.STRING)
    private QuizDifficulty quizDifficulty;

    @Min(1)
    private Integer duration;

    @Min(1)
    private Integer questionsPerPage;

    @NotNull
    private Boolean allowBack;

    @NotEmpty
    private List<QuestionDto> questions = new ArrayList<>();

}
