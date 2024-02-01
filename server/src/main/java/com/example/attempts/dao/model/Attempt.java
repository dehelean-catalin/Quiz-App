package com.example.attempts.dao.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "attempts")
public class Attempt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String quizId;

    @Column(nullable = false)
    private String startTime;

    @Column(nullable = false)
    private String endTime;

    @Column(nullable = false)
    private Boolean isCompleted = false;

    private String completedAt;

    @Column(nullable = false)
    private int currentPage = -1;

    @Column(nullable = false)
    private int numberOfPages;

    @Column(nullable = false)
    private boolean allowedBack;

    @Column(nullable = false)
    private int questionsPerPage;

    @OneToMany(cascade = CascadeType.ALL)
    private List<AttemptQuestions> attemptQuestions = new ArrayList<>();

    public Attempt(String quizId, String startTime, String endTime, Boolean allowedBack,
                   int numberOfPages, int questionsPerPage) {
        this.quizId = quizId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.allowedBack = allowedBack;
        this.numberOfPages = numberOfPages;
        this.questionsPerPage = questionsPerPage;
    }

    public void addAnswer(AttemptQuestions attemptQuestions) {
        this.attemptQuestions.add(attemptQuestions);
    }

}
