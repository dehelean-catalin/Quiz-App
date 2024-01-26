package com.example.quizzes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnswerDto {
    @NotBlank(message = "Answer is blank")
    private String answer;
    @NotNull
    private Boolean isValid;
}
