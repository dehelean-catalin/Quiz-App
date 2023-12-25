package com.example.quizzes;

import com.example.questions.Question;
import jakarta.persistence.*;
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
public class QuizDTO {

    @NotBlank(message = "Title is invalid")
    private String title;

    @NotBlank(message = "Description is invalid")
    private String description;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Min(value = 1, message = "Duration is invalid")
    private Integer duration;

    @Min(value = 1, message = "Questions per page is invalid")
    @Column(name = "questions_per_page")
    private Integer questionsPerPage;

    @NotNull(message = "Check previous is invalid")
    @Column(name = "check_previous")
    private Boolean checkPrevious;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();
}
