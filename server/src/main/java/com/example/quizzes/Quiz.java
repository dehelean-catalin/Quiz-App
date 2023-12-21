package com.example.quizzes;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "quizzes")
public class Quiz {
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    @Column(nullable = false)
    String title;
    @Column(nullable = false)
    String description;
    String difficulty;
    Integer duration;
    @Column(name = "questions_per_page")
    Integer questionsPerPage;
    @Column(name = "check_previous")
    Boolean checkPrevious;
    List<String> questions;
    List<String> categories;
    List<String> subCategories;
}
