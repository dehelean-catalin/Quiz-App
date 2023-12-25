package com.example.quizzes;

import com.example.questions.Question;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
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

    @NotEmpty
    @Column(unique = true, nullable = false)
    private String title;

    @NotEmpty
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
