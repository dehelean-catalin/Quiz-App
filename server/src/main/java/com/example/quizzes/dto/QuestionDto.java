package com.example.quizzes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDto {
    @NotBlank(message = "Question title is invalid")
    private String title;

    @Positive(message = "Points are invalid")
    private int points;

    @NotEmpty
    private List<AnswerDto> answers;
}
