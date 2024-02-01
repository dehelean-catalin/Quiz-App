package com.example.attempts.dto;

import com.example.quizzes.dao.model.Answer;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class QuestionResult {

    private String id;
    private String title;

    private int score = 0;

    private int points;

    private List<String> yourAnswers = new ArrayList<>();

    private List<Answer> answers = new ArrayList<>();

    public QuestionResult(String id, String title, List<Answer> answers, Integer points) {

        this.id = id;
        this.title = title;
        this.answers = answers;
        this.points = points;
    }
}
