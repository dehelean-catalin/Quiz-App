package com.example.answers;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String answer;
    private Boolean isValid;

    public Answer(String answer, Boolean isValid) {
        this.answer = answer;
        this.isValid = isValid;
    }
}
