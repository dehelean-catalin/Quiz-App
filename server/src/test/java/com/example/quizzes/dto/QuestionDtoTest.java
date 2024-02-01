package com.example.quizzes.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Set;

import static com.example.helpers.CreateQuizMother.createAnswerListDto;
import static com.example.helpers.CreateQuizMother.createQuestionDto;
import static org.junit.jupiter.api.Assertions.assertEquals;

class QuestionDtoTest {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    void titleIsNoNull() {
        QuestionDto questionWithNullTile = createQuestionDto(null, 3, createAnswerListDto());

        Set<ConstraintViolation<QuestionDto>> violations = validator.validate(questionWithNullTile);

        assertEquals(1, violations.size());

    }

    @Test
    void titleIsNoBlank() {
        QuestionDto questionWithNullTile = createQuestionDto(" ", 3, createAnswerListDto());

        Set<ConstraintViolation<QuestionDto>> violations = validator.validate(questionWithNullTile);

        assertEquals(1, violations.size());
    }

    @Test
    void pointsHaveAPositiveValue() {
        QuestionDto questionWithNullTile = createQuestionDto("HTML", -1, createAnswerListDto());

        Set<ConstraintViolation<QuestionDto>> violations = validator.validate(questionWithNullTile);

        assertEquals(1, violations.size());
    }

    @Test
    void answersAreNotEmpty() {
        QuestionDto questionWithNullTile = createQuestionDto("HTML", 1, new ArrayList<>());

        Set<ConstraintViolation<QuestionDto>> violations = validator.validate(questionWithNullTile);

        assertEquals(1, violations.size());
    }

}