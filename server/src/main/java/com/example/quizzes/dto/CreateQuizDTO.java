package com.example.quizzes.dto;

import com.example.quizzes.dao.Difficulty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuizDTO {

    @NotBlank(message = "Title is invalid")
    private String title;

    @NotBlank(message = "Description is invalid")
    private String description;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Min(value = 1, message = "Duration is invalid")
    private Integer duration;

    @Min(value = 1, message = "Questions per page is invalid")
    private Integer questionsPerPage;

    @NotNull(message = "Allow Back is invalid")
    private Boolean allowBack;

    @NotNull(message = "Questions are invalid")
    private List<QuestionDto> questions = new ArrayList<>();

}
