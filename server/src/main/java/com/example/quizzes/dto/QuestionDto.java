package com.example.quizzes.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionDto {
    @NotBlank
    private String title;

    @Min(0)
    @NotNull
    private int points;

    @NotEmpty
    private List<AnswerDto> answers;
}
