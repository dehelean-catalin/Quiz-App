package com.example.auth;

import com.example.users.AuthenticateRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class AuthenticateRequestTests {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    void emailMustBeValid() {
        AuthenticateRequest authenticateRequest = new AuthenticateRequest("drcatalin00@.com", "12345678");

        Set<ConstraintViolation<AuthenticateRequest>> violations = validator.validate(authenticateRequest);

        assertThat(violations.size()).isEqualTo(1);
    }

    // TODO: validate password.
    @Test
    void passwordMustBeValid() {
        AuthenticateRequest authenticateRequest = new AuthenticateRequest(
                "drcatalin00@gmail.com", "123");

        Set<ConstraintViolation<AuthenticateRequest>> violations = validator.validate(authenticateRequest);
        assertThat(violations.size()).isEqualTo(1);
    }
}
