package com.example.quizzes.dao.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String answer;

    @Column(nullable = false)
    private Boolean isValid;

    public Answer(String answer, Boolean isValid) {
        this.answer = answer;
        this.isValid = isValid;
    }
}
