package com.example.quizzes;

import com.example.questions.Question;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
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
    private List<Question> questions = new ArrayList<>();

    @NotNull(message = "Questions are invalid")
    private List<String> categories = new ArrayList<>();

    @NotNull(message = "Questions are invalid")
    private List<String> subCategories = new ArrayList<>();

}
