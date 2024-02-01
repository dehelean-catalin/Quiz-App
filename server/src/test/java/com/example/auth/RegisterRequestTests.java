package com.example.auth;

import com.example.users.RegisterRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class RegisterRequestTests {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    void firstNameMustNotBeBlank() {
        RegisterRequest registerRequest = new RegisterRequest(
                " ",
                "cosmin",
                "drcatalin00@gmail.com",
                "12345678",
                "12345678"
        );

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(registerRequest);
        assertThat(violations.size()).isEqualTo(1);
    }

    @Test
    void lastNameMustNotBeBlank() {
        RegisterRequest registerRequest = new RegisterRequest(
                "cosmin",
                " ",
                "drcatalin00@gmail.com",
                "12345678",
                "12345678"
        );
        Set<ConstraintViolation<RegisterRequest>> violations =
                validator.validate(registerRequest);
        assertThat(violations.size()).isEqualTo(1);
    }

    @Test
    void emailMustNotHaveInvalidFormat() {
        RegisterRequest registerRequest = new RegisterRequest(
                "cosmin",
                "cosmin",
                "drcatalin00@gmail",
                "12345678",
                "12345678"
        );
        Set<ConstraintViolation<RegisterRequest>> violations =
                validator.validate(registerRequest);
        System.out.println(violations);
        assertThat(violations.size()).isEqualTo(1);
    }
    // TODO add password validation and password check

}
