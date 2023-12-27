package com.example.categories;

import com.example.subCategories.QuizSubCategories;
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
@Table(name = "quiz_categories")
public class QuizCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @NotBlank
    private String category;

    @OneToMany
    List<QuizSubCategories> quizSubCategoriesList = new ArrayList<>();
}
