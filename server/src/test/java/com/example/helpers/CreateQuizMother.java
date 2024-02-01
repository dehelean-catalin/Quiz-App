package com.example.helpers;

import com.example.quizzes.dto.AnswerDto;
import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuestionDto;

import java.util.ArrayList;
import java.util.List;

import static com.example.quizzes.dao.model.QuizDifficulty.EASY;

public class CreateQuizMother {


    public static CreateQuizDTO createQuizWithNullValues() {
        return CreateQuizDTO.builder()
                .title(null)
                .description(null)
                .allowBack(null)
                .quizDifficulty(null)
                .duration(null)
                .questionsPerPage(null)
                .questions(new ArrayList<>())
                .build();
    }

    public static CreateQuizDTO createQuizWithEmptyValues() {
        return CreateQuizDTO.builder()
                .title("")
                .description("")
                .allowBack(true)
                .quizDifficulty(EASY)
                .duration(2)
                .questionsPerPage(2)
                .questions(new ArrayList<>())
                .build();
    }

    public static CreateQuizDTO createQuizWithBlankValues() {
        return CreateQuizDTO.builder()
                .title("  ")
                .description("   ")
                .allowBack(true)
                .quizDifficulty(EASY)
                .duration(2)
                .questionsPerPage(2)
                .questions(createValidQuestionsDto())
                .build();
    }

    public static CreateQuizDTO createQuizWithNegativeDuration() {
        return CreateQuizDTO.builder()
                .title("Haha")
                .description("Haha")
                .duration(-1)
                .questionsPerPage(1)
                .allowBack(true)
                .quizDifficulty(EASY)
                .questions(createValidQuestionsDto())
                .build();
    }

    public static CreateQuizDTO createQuizWithNegativeQuestionsPerPage() {
        return CreateQuizDTO.builder()
                .title("Haha")
                .description("Haha")
                .duration(1)
                .questionsPerPage(-1)
                .allowBack(true)
                .quizDifficulty(EASY)
                .questions(createValidQuestionsDto())
                .build();
    }

    public static List<QuestionDto> createValidQuestionsDto() {
        List<QuestionDto> questionDtos = new ArrayList<>();
        List<AnswerDto> answerDtos = createAnswerListDto();

        questionDtos.add(createQuestionDto("HTML questions 1", 1, answerDtos));
        questionDtos.add(createQuestionDto("HTML questions 2", 2, answerDtos));
        questionDtos.add(createQuestionDto("HTML questions 3", 3, answerDtos));

        return questionDtos;
    }

    public static QuestionDto createQuestionDto(String title, int points, List<AnswerDto> answerDtos) {
        return QuestionDto.builder()
                .title(title)
                .points(points)
                .answers(answerDtos)
                .build();
    }

    public static List<AnswerDto> createAnswerListDto() {
        List<AnswerDto> answerListDto = new ArrayList<>();
        answerListDto.add(createAnswerDto("Yes", false));
        answerListDto.add(createAnswerDto("No", true));

        return answerListDto;
    }

    public static AnswerDto createAnswerDto(String answer, boolean isValid) {
        return AnswerDto.builder()
                .answer(answer)
                .isValid(isValid)
                .build();
    }

}
