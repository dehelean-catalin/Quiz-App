package com.example.questions;

import com.example.answers.Answer;
import com.example.quizzes.Quiz;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private Integer points;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
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
}
