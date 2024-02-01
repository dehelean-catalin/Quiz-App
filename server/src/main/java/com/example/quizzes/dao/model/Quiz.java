package com.example.quizzes.dao.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

import static com.example.quizzes.dao.model.QuizDifficulty.EASY;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "quizzes")
@Builder
@AllArgsConstructor
public class Quiz {

    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuizDifficulty quizDifficulty = EASY;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private Integer questionsPerPage;

    @Column(name = "check_previous", nullable = false)
    private Boolean allowBack;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "quiz")
    private List<Question> questions = new ArrayList<>();

    public Quiz(String title, String description, QuizDifficulty quizDifficulty,
                Integer duration, Integer questionsPerPage, Boolean allowBack) {
        this.title = title;
        this.description = description;
        this.quizDifficulty = quizDifficulty;
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
