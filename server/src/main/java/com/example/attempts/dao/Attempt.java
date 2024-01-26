package com.example.attempts.dao;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank
    @Column(name = "quiz_id")
    private String quizId;

    @NotBlank
    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "is_completed")
    private Boolean isCompleted = false;

    @Column(name = "completed_at")
    private String completedAt;

    @Column(name = "current_page")
    private int currentPage = -1;

    @Column(name = "number_of_pages")
    private int numberOfPages;

    @Column(name = "allowed_back")
    private boolean allowedBack;

    @Column(name = "questions_per_page")
    private int questionsPerPage = 2;

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
