package com.example.users;

import org.apache.coyote.BadRequestException;

public interface UserService {
    String signUp(SignUpUserDTO userDTO) throws BadRequestException;

    String login(User user);
}
