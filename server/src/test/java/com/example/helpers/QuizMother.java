package com.example.helpers;

import com.example.answers.Answer;
import com.example.questions.Question;
import com.example.quizzes.dao.Difficulty;
import com.example.quizzes.dao.Quiz;
import com.example.quizzes.dto.AnswerDto;
import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuestionDto;
import com.example.quizzes.dto.QuizSummaryDTO;

import java.util.ArrayList;
import java.util.List;

import static com.example.quizzes.service.QuizHelpers.convertQuizToQuizSummaryDTO;

public class QuizMother {


    public static List<Quiz> createListOfQuizzesMock(int numberOfQuizzes) {
        List<Quiz> quizzes = new ArrayList<>();

        for (int i = 0; i < numberOfQuizzes; i++) {
            quizzes.add(createQuizMock("123" + i, 2));
        }

        return quizzes;
    }

    public static Quiz createQuizMock(String id, int numberOfQuestions) {

        List<Question> questions = getQuestions(numberOfQuestions);

        return Quiz.builder()
                .id(id)
                .title("HTML")
                .description("HTML Quiz")
                .duration(5)
                .difficulty(Difficulty.Easy)
                .allowBack(true)
                .questionsPerPage(2)
                .questions(questions)
                .build();
    }

    public static CreateQuizDTO createQuizDtoMock(int numberOfQuestions) {
        List<QuestionDto> questions = getQuestionsDto(numberOfQuestions);

        return CreateQuizDTO.builder()
                .title("HTML")
                .description("HTML Quiz")
                .duration(5)
                .difficulty(Difficulty.Easy)
                .allowBack(true)
                .questionsPerPage(2)
                .questions(questions)
                .build();
    }


    public static List<QuizSummaryDTO> createExpectedQuizSummaries(List<Quiz> mockQuizzes) {

        List<QuizSummaryDTO> quizSummaryDTOS = new ArrayList<>();

        mockQuizzes.forEach(quiz -> quizSummaryDTOS.add(convertQuizToQuizSummaryDTO(quiz)));

        return quizSummaryDTOS;

    }

    public static List<Question> getQuestions(int numberOfQuestions) {
        List<Question> questions = new ArrayList<>();

        for (int i = 0; i < numberOfQuestions; i++) {
            Question question = new Question("Hhe", 1);
            question.addAnswer(new Answer("Hha", true));

            questions.add(question);
        }

        return questions;
    }

    public static List<QuestionDto> getQuestionsDto(int numberOfQuestions) {
        List<QuestionDto> questions = new ArrayList<>();
        List<AnswerDto> answerDtos = new ArrayList<>();

        answerDtos.add(new AnswerDto("1", true));
        answerDtos.add(new AnswerDto("2", false));

        for (int i = 0; i < numberOfQuestions; i++) {
            QuestionDto question = new QuestionDto("Hhe", 1, answerDtos);

            questions.add(question);
        }

        return questions;
    }
}
