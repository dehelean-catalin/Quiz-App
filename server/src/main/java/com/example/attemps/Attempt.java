package com.example.attemps;

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
    private String endTime = null;

    @OneToMany(cascade = CascadeType.ALL)
    private List<AttemptQuestions> attemptAnswers = new ArrayList<>();

    public void addAnswer(AttemptQuestions attemptQuestions) {
        attemptAnswers.add(attemptQuestions);
    }


}
