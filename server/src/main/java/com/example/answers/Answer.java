package com.example.answers;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @NotBlank
    private String answer;
    @Column(name = "is_valid")
    private Boolean isValid;

    public Answer(String answer, Boolean isValid) {
        this.answer = answer;
        this.isValid = isValid;
    }
}
