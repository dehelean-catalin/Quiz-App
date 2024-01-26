package com.example.quizzes.service;

import com.example.answers.Answer;
import com.example.questions.Question;
import com.example.quizzes.dao.Quiz;
import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuestionDto;
import com.example.quizzes.dto.QuizSummaryDTO;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;

import java.util.concurrent.atomic.AtomicInteger;

public class QuizHelpers {
    public static QuizSummaryDTO convertQuizToQuizSummaryDTO(Quiz quiz) {
        ModelMapper modelMapper = new ModelMapper();
        QuizSummaryDTO quizSummaryDTO = modelMapper.map(quiz, QuizSummaryDTO.class);

        int numberOfQuestions = quiz.getQuestions().size();
        quizSummaryDTO.setNumberOfQuestions(numberOfQuestions);

        return quizSummaryDTO;
    }

    public static Quiz convertQuizDtoToQuiz(CreateQuizDTO quizDto) throws BadRequestException {
        Quiz quiz = new Quiz(quizDto.getTitle(),
                quizDto.getDescription(),
                quizDto.getDifficulty(),
                quizDto.getDuration(),
                quizDto.getQuestionsPerPage(),
                quizDto.getAllowBack());

        for (QuestionDto questionDto : quizDto.getQuestions()) {
            Question newQuestion = new Question(questionDto.getTitle(), questionDto.getPoints());

            AtomicInteger validAnswersCount = new AtomicInteger(0);

            questionDto.getAnswers().forEach((answer) -> {
                Answer newAnswer = new Answer(answer.getAnswer(), answer.getIsValid());

                if (answer.getIsValid()) {
                    validAnswersCount.getAndIncrement();
                }

                newQuestion.addAnswer(newAnswer);
            });

            if (validAnswersCount.get() == 0) {
                throw new BadRequestException("No valid answers for question: " + newQuestion.getId());
            }

            quiz.addQuestion(newQuestion);
        }

        return quiz;
    }
}
