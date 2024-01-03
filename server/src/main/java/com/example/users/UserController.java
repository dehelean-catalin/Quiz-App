package com.example.users;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
//@Tag(name = "user", description = "Endpoints for user actions")
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public AuthenticationResponse signUp(@Valid @RequestBody RegisterRequest registerRequest) throws BadRequestException {
        String token = userService.signUp(registerRequest);

        return new AuthenticationResponse(token);
    }

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticate(@Valid @RequestBody AuthenticateRequest authenticateRequest) throws BadRequestException {
        String token = userService.login(authenticateRequest);

        return new AuthenticationResponse(token);
    }
}
