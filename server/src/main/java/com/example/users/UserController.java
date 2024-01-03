package com.example.users;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
//@Tag(name = "user", description = "Endpoints for user actions")
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public AuthenticationResponse signUp(@Valid @RequestBody RegisterRequest signUpUserDTO) throws BadRequestException {
        String token = userService.signUp(signUpUserDTO);

        return new AuthenticationResponse(token);
    }

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticate(@Valid @RequestBody AuthenticateRequest authenticateRequest) throws BadRequestException {
        String token = userService.login(authenticateRequest);

        return new AuthenticationResponse(token);
    }

    private static String getName(Authentication authentication) {
        return Optional.of(authentication.getPrincipal())
                .filter(OidcUser.class::isInstance)
                .map(OidcUser.class::cast)
                .map(OidcUser::getEmail)
                .orElseGet(authentication::getName);
    }
}
