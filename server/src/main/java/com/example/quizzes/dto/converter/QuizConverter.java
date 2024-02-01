package com.example.quizzes.dto.converter;

import com.example.quizzes.dao.model.Answer;
import com.example.quizzes.dao.model.Question;
import com.example.quizzes.dao.model.Quiz;
import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuestionDto;
import com.example.quizzes.dto.QuizSummaryDTO;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;

import java.util.concurrent.atomic.AtomicInteger;

public class QuizConverter {
    public static QuizSummaryDTO quizToQuizSummaryDTO(Quiz quiz) {
        ModelMapper modelMapper = new ModelMapper();
        QuizSummaryDTO quizSummaryDTO = modelMapper.map(quiz, QuizSummaryDTO.class);

        int numberOfQuestions = quiz.getQuestions().size();
        quizSummaryDTO.setNumberOfQuestions(numberOfQuestions);

        return quizSummaryDTO;
    }

    public static Quiz createQuizDtoToQuiz(CreateQuizDTO quizDto) throws BadRequestException {
        Quiz quiz = new Quiz(quizDto.getTitle(),
                quizDto.getDescription(),
                quizDto.getQuizDifficulty(),
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
