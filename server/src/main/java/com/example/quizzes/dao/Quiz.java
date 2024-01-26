package com.example.quizzes.dao;

import com.example.questions.Question;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Title is invalid")
    @Column(unique = true)
    private String title;

    @NotBlank(message = "Description is invalid")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty = Difficulty.Easy;

    @Min(value = 1, message = "Duration is invalid")
    private Integer duration = 5;

    @Min(value = 1, message = "Questions per page is invalid")
    @Column(name = "questions_per_page")
    private Integer questionsPerPage = 2;

    @NotNull(message = "Check previous is invalid")
    @Column(name = "check_previous")
    private Boolean allowBack = false;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "quiz")
    private List<Question> questions = new ArrayList<>();

    public Quiz(String title, String description, Difficulty difficulty,
                Integer duration, Integer questionsPerPage, Boolean allowBack) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.duration = duration;
        this.questionsPerPage = questionsPerPage;
        this.allowBack = allowBack;
    }

    public Quiz(String id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }


    public void addQuestion(Question tempQuestion) {
        questions.add(tempQuestion);
        tempQuestion.setQuiz(this);
    }
}
