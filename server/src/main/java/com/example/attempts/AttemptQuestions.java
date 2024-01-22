package com.example.attempts;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@Table(name = "attempt_answers")
public class AttemptQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "question_id")
    private String questionId;

    private List<String> answersId = new ArrayList<>();

    public AttemptQuestions(String questionId, List<String> answersId) {
        this.questionId = questionId;
        this.answersId = answersId;
    }
}
