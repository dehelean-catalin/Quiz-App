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
@Entity
@NoArgsConstructor
@AllArgsConstructor
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
            orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "quiz")
    private List<Question> questions = new ArrayList<>();

    @OneToMany
    private List<QuizCategories> quizCategories = new ArrayList<>();

    @OneToMany
    private List<QuizSubCategories> quizSubCategories = new ArrayList<>();

    public Quiz(String title, String description, Difficulty difficulty,
                Integer duration, Integer questionsPerPage, Boolean checkPrevious) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.duration = duration;
        this.questionsPerPage = questionsPerPage;
        this.checkPrevious = checkPrevious;
    }

    public void addQuestion(Question tempQuestion) {
        questions.add(tempQuestion);
        tempQuestion.setQuiz(this);
    }
}
