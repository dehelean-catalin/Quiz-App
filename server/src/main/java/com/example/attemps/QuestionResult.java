package com.example.attemps;

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
    private int points = 0;

    private List<String> yourAnswers = new ArrayList<>();

    private List<Answer> answers = new ArrayList<>();

    public QuestionResult(String id, String title, List<Answer> answers) {

        this.id = id;
        this.title = title;
        this.answers = answers;
    }
}
