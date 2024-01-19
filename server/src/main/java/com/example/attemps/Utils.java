package com.example.attemps;

import com.example.answers.Answer;
import com.example.questions.Question;
import com.example.quizzes.Quiz;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

class Utils {

    static QuizResultResponse convertAttemptToQuizResult(Quiz quiz, Attempt attempt) {

        long timeDeltaInSeconds = getTimeDeltaInSeconds(attempt.getStartTime(), attempt.getCompletedAt());

        QuizResultResponse quizResultResponse = new QuizResultResponse(
                attempt.getId(),
                quiz.getTitle(),
                attempt.getStartTime(),
                attempt.getCompletedAt(),
                timeDeltaInSeconds
        );

        List<Question> questions = quiz.getQuestions();

        questions.forEach(question -> {
            QuestionResult questionResult = new QuestionResult(
                    question.getId(),
                    question.getTitle(),
                    question.getAnswers()
            );

            List<String> correctAnswers = findCorrectAnswerIds(question.getAnswers());

            attempt.getAttemptAnswers().stream()
                    .filter(attemptQuestions ->
                            attemptQuestions.getQuestionId().equals(question.getId())
                    )
                    .findFirst()
                    .ifPresent(result ->
                            setScoreAndPoints(question, result, questionResult, correctAnswers)
                    );

            quizResultResponse.addQuestionResult(questionResult);

        });

        quizResultResponse.setScorePercentage();

        return quizResultResponse;
    }

    private static void setScoreAndPoints(Question question, AttemptQuestions result, QuestionResult questionResult, List<String> correctAnswers) {
        List<String> myAnswers = result.getAnswersId();
        questionResult.setYourAnswers(myAnswers);

        Integer points = question.getPoints();

        if (myAnswers.equals(correctAnswers)) questionResult.setScore(points);

        questionResult.setPoints(points);
    }

    private static List<String> findCorrectAnswerIds(List<Answer> answers) {
        return answers.stream()
                .filter(Answer::getIsValid)
                .map(Answer::getId)
                .toList();
    }

    static long getTimeDeltaInSeconds(String startTime, String completedAt) {

        return ChronoUnit.SECONDS.between(LocalDateTime.parse(startTime), LocalDateTime.parse(completedAt));
    }

    static boolean hasExpired(LocalDateTime targetDate) {
        return LocalDateTime.now().isAfter(targetDate);
    }

}
