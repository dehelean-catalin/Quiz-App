package com.example.quizzes;

import com.example.questions.Question;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizzes")
public class Quiz {
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    private String difficulty;
    private Integer duration;
    @Column(name = "questions_per_page")
    private Integer questionsPerPage;
    @Column(name = "check_previous")
    private Boolean checkPrevious;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;
//    List<String> categories;
//    List<String> subCategories;
    

}
