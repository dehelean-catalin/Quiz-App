package com.example.attemps;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
public class QuizResultResponse {
    private String id;
    private String title;

    private String startTime;
    private String endTime;

    private int totalScore = 0;

    public QuizResultResponse(String id, String title, String startTime, String endTime) {
        this.endTime = endTime;
        this.startTime = startTime;
        this.id = id;
        this.title = title;
    }

    private List<QuestionResult> questions = new ArrayList<>();

    public void addQuestionResult(QuestionResult questionResult) {
        totalScore += questionResult.getScore();
        questions.add(questionResult);
    }
}
