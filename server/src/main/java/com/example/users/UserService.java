package com.example.users;

import org.apache.coyote.BadRequestException;

public interface UserService {
    String signUp(RegisterRequest request) throws BadRequestException;

    String login(AuthenticateRequest request);
}
