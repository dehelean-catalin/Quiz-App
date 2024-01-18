package com.example.attemps;

import com.example.answers.Answer;
import com.example.questions.Question;
import com.example.quizzes.Quiz;

import java.util.List;
import java.util.Optional;

class Utils {

    public static QuizResultResponse convertAttemptToQuizResult(Quiz quiz,
                                                                Attempt attempt) {
        QuizResultResponse quizResultResponse = new QuizResultResponse(attempt.getId(),
                quiz.getTitle(), attempt.getStartTime(), attempt.getEndTime());

        List<Question> questions = quiz.getQuestions();

        questions.forEach(question -> {
            QuestionResult questionResult = new QuestionResult();

            List<String> correctAnswers = question.getAnswers()
                    .stream()
                    .filter(Answer::getIsValid)
                    .map(Answer::getId)
                    .toList();

            System.out.println(correctAnswers);

            Optional<AttemptQuestions> first = attempt.getAttemptAnswers().stream()
                    .filter(attemptQuestions ->
                            attemptQuestions.getQuestionId().equals(question.getId())
                    ).findFirst();

            if (first.isPresent()) {
                List<String> myAnswers = first.get().getAnswersId();
                System.out.println(myAnswers);
                questionResult.setYourAnswers(myAnswers);

                if (myAnswers.equals(correctAnswers)) {
                    questionResult.setScore(question.getPoints());
                }
            }

            questionResult.setTitle(question.getTitle());
            questionResult.setId(question.getId());
            questionResult.setAnswers(question.getAnswers());

            quizResultResponse.addQuestionResult(questionResult);
        });

        return quizResultResponse;
    }


}
