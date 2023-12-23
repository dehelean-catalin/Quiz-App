package com.example.answers;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String title;
    Boolean isValid;

}
