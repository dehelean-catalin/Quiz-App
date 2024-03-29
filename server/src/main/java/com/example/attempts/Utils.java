package com.example.attempts;

import com.example.attempts.dao.model.AttemptQuestions;
import com.example.attempts.dto.QuestionResultRDto;
import com.example.quizzes.dao.model.Answer;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class Utils {

    public static void setScoreAndPoints(AttemptQuestions result, QuestionResultRDto questionResultRDto,
                                         List<String> correctAnswers, Integer points) {
        List<String> myAnswers = result.getAnswersId();
        questionResultRDto.setYourAnswers(myAnswers);

        if (myAnswers.equals(correctAnswers)) {
            questionResultRDto.setScore(points);
        }

    }

    public static List<String> findCorrectAnswerIds(List<Answer> answers) {
        return answers.stream()
                .filter(Answer::getIsValid)
                .map(Answer::getId)
                .toList();
    }

    public static long getTimeDeltaInSeconds(String startTime, String completedAt) {

        return ChronoUnit.SECONDS.between(LocalDateTime.parse(startTime), LocalDateTime.parse(completedAt));
    }

    public static boolean hasExpired(LocalDateTime targetDate) {
        return LocalDateTime.now().isAfter(targetDate);
    }

}
