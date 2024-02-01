package com.example.attempts.dto.converter;

import com.example.attempts.dao.model.Attempt;
import com.example.attempts.dto.AttemptResultDto;
import com.example.attempts.dto.QuestionResultRDto;
import com.example.quizzes.dao.model.Question;
import com.example.quizzes.dao.model.Quiz;

import java.util.List;

import static com.example.attempts.Utils.*;

public class AttemptConverter {
    public static AttemptResultDto attemptToAttemptResultDto(Quiz quiz, Attempt attempt) {

        long timeDeltaInSeconds = getTimeDeltaInSeconds(attempt.getStartTime(), attempt.getCompletedAt());

        AttemptResultDto attemptResultDto = new AttemptResultDto(
                attempt.getId(),
                quiz.getId(),
                quiz.getTitle(),
                attempt.getStartTime(),
                attempt.getCompletedAt(),
                timeDeltaInSeconds
        );

        List<Question> questions = quiz.getQuestions();

        questions.forEach(question -> {
            QuestionResultRDto questionResultRDto = new QuestionResultRDto(
                    question.getId(),
                    question.getTitle(),
                    question.getAnswers(),
                    question.getPoints()
            );

            List<String> correctAnswers = findCorrectAnswerIds(question.getAnswers());

            attempt.getAttemptQuestions().stream()
                    .filter(attemptQuestions ->
                            attemptQuestions.getQuestionId().equals(question.getId())
                    )
                    .findFirst()
                    .ifPresent(result ->
                            setScoreAndPoints(result, questionResultRDto, correctAnswers, questionResultRDto.getPoints())
                    );

            attemptResultDto.addQuestionResult(questionResultRDto);

        });

        attemptResultDto.setScorePercentage();

        return attemptResultDto;
    }
}
