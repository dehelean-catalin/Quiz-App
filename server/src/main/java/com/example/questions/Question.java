package com.example.questions;

import com.example.answers.Answer;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String title;
    Integer points;
    @OneToMany()
    List<Answer> answers;

}
