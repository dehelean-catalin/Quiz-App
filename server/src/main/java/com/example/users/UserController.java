package com.example.users;

import com.example.utils.ResponseMessage;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
//@Tag(name = "user", description = "Endpoints for user actions")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String showWelcomeMessage() {
        return "Welcome";
    }

    @GetMapping("/sign-up")
    public String showMessage(Authentication authentication) {
        return getName(authentication);
    }

    @PostMapping("/sign-up")
    public ResponseMessage signUp(@Valid @RequestBody SignUpUserDTO signUpUserDTO) throws BadRequestException {
        var response = userService.signUp(signUpUserDTO);
        return new ResponseMessage(response);
    }

    private static String getName(Authentication authentication) {
        return Optional.of(authentication.getPrincipal())
                .filter(OidcUser.class::isInstance)
                .map(OidcUser.class::cast)
                .map(OidcUser::getEmail)
                .orElseGet(authentication::getName);
    }
}
