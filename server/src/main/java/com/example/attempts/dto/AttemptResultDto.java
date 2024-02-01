package com.example.attempts.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class AttemptResultDto {
    private String id;
    private String quizId;
    private String title;
    private String startTime;
    private String completedAt;
    private long timeDeltaInSeconds;
    private int totalScore = 0;
    private int totalPoints = 0;
    private int scorePercentage;
    private List<QuestionResultRDto> questions = new ArrayList<>();

    public AttemptResultDto(String id, String quizId, String title, String startTime,
                            String completedAt,
                            long timeDeltaInSeconds) {
        this.id = id;
        this.quizId = quizId;
        this.title = title;
        this.startTime = startTime;
        this.completedAt = completedAt;
        this.timeDeltaInSeconds = timeDeltaInSeconds;
    }

    public void addQuestionResult(QuestionResultRDto questionResultRDto) {
        this.totalScore += questionResultRDto.getScore();
        this.totalPoints += questionResultRDto.getPoints();
        questions.add(questionResultRDto);
    }

    public void setScorePercentage() {
        float scorePercentage = ((float) totalScore / totalPoints) * 100;
        this.scorePercentage = Math.round(scorePercentage);
    }

}
