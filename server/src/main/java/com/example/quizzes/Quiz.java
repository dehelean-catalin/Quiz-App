package com.example.quizzes;

import com.example.questions.Question;
import jakarta.persistence.*;
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

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private Integer duration;

    @Column(name = "questions_per_page")
    private Integer questionsPerPage;

    @Column(name = "check_previous")
    private Boolean checkPrevious;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

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
    }
}
