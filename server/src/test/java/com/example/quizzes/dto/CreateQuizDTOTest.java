package com.example.quizzes.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static com.example.helpers.CreateQuizMother.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

class CreateQuizDTOTest {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    public void fieldsAreNotNull() {
        CreateQuizDTO createQuizDTO = createQuizWithNullValues();

        assertEquals(7, violationsCount(createQuizDTO));
    }

    @Test
    public void fieldsAreNotEmpty() {
        CreateQuizDTO createEmptyQuizDTO = createQuizWithEmptyValues();

        assertEquals(3, violationsCount(createEmptyQuizDTO));
    }

    @Test
    public void titleAndDescriptionAreNotBlank() {
        CreateQuizDTO createQuizDTO = createQuizWithBlankValues();

        assertEquals(2, violationsCount(createQuizDTO));
    }

    @Test
    void durationIsGreaterThanZero() {
        CreateQuizDTO createQuizDTO = createQuizWithNegativeDuration();
        Set<ConstraintViolation<CreateQuizDTO>> violations = validator.validate(createQuizDTO);

        assertFalse(violations.isEmpty());
    }

    @Test
    void numberOfQuestionsPerPageIsGreaterThanZero() {
        CreateQuizDTO createQuizDTO = createQuizWithNegativeQuestionsPerPage();
        Set<ConstraintViolation<CreateQuizDTO>> violations = validator.validate(createQuizDTO);

        assertFalse(violations.isEmpty());
    }

    public static int violationsCount(CreateQuizDTO createQuizDTO) {
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<CreateQuizDTO>> violations = validator.validate(createQuizDTO);

        return violations.size();
    }
}