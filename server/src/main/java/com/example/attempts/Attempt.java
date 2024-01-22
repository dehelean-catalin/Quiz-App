package com.example.attempts;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private String completedAt = null;

    @OneToMany(cascade = CascadeType.ALL)
    private List<AttemptQuestions> attemptQuestions = new ArrayList<>();

    public Attempt(String quizId, String startTime, String endTime) {

        this.quizId = quizId;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public void addAnswer(AttemptQuestions attemptQuestions) {
        this.attemptQuestions.add(attemptQuestions);
    }

}
