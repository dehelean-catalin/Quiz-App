package com.example.quizzes.dto;

import com.example.helpers.CreateQuizMother;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AnswerDtoTest {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    void answerIsNotNull() {
        AnswerDto answerDto = CreateQuizMother.createAnswerDto(null, true);

        Set<ConstraintViolation<AnswerDto>> validate = validator.validate(answerDto);

        assertEquals(1, validate.size());
    }

    @Test
    void answerIsNotBlank() {
        AnswerDto answerDto = CreateQuizMother.createAnswerDto("   ", true);

        Set<ConstraintViolation<AnswerDto>> validate = validator.validate(answerDto);

        assertEquals(1, validate.size());
    }

}