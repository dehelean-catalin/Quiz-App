package com.example.attempts;

import com.example.answers.Answer;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
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
