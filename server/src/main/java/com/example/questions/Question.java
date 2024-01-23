package com.example.questions;

import com.example.answers.Answer;
import com.example.quizzes.Quiz;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Title is invalid")
    private String title;

    @Positive(message = "Points are invalid")
    private Integer points;

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();

    public Question(String title, Integer points) {
        this.title = title;
        this.points = points;
    }

    public void addAnswer(Answer tempAnswer) {
        answers.add(tempAnswer);
    }

    public void addAllAnswers(List<Answer> answers) {
        answers.addAll(answers);
    }
}
