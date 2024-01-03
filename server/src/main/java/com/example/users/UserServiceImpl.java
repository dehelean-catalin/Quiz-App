package com.example.users;

import org.apache.coyote.BadRequestException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;
    PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String signUp(SignUpUserDTO userDTO) throws BadRequestException {
        User user = new User();

        var password = userDTO.getPassword();
        String confirmPassword = userDTO.getConfirmPassword();

        if (!password.equals(confirmPassword)) {
            throw new BadRequestException("Invalid credentials");
        }

        user.setName(userDTO.getFirstName() + " " + userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        userRepo.save(user);

        return "Success";
    }

    @Override
    public String login(User user) {
        return null;
    }
}
