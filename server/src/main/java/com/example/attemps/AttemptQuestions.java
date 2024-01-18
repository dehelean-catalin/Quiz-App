package com.example.attemps;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "attempt_answers")
public class AttemptAnswers {
    private String questionId;
    private List<String> answersId = new ArrayList<>();
}
