package com.example.attempts.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class QuizResultResponse {
    private String id;
    private String quizId;
    private String title;

    private String startTime;
    private String completedAt;
    private long timeDeltaInSeconds;

    private int totalScore = 0;
    private int totalPoints = 0;

    private float scorePercentage;

    public QuizResultResponse(String id, String quizId, String title, String startTime,
                              String completedAt,
                              long timeDeltaInSeconds) {
        this.id = id;
        this.quizId = quizId;
        this.title = title;
        this.startTime = startTime;
        this.completedAt = completedAt;
        this.timeDeltaInSeconds = timeDeltaInSeconds;
    }

    private List<QuestionResult> questions = new ArrayList<>();

    public void addQuestionResult(QuestionResult questionResult) {
        this.totalScore += questionResult.getScore();
        this.totalPoints += questionResult.getPoints();
        questions.add(questionResult);
    }

    public void setScorePercentage() {
        float scorePercentage = ((float) totalScore / totalPoints) * 100;
        this.scorePercentage = Math.round(scorePercentage);
    }

}
