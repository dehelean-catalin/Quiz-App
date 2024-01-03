package com.example.users;

import com.example.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public String signUp(RegisterRequest userDTO) throws BadRequestException {
        User user = new User();

        String password = userDTO.getPassword();
        String confirmPassword = userDTO.getConfirmPassword();

        if (!password.equals(confirmPassword)) {
            throw new BadRequestException("Invalid credentials");
        }

        user.setName(userDTO.getFirstName() + " " + userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRoles(List.of(Role.USER));

        userRepo.save(user);

        return jwtService.generateToken(user);
    }

    @Override
    public String login(AuthenticateRequest authenticateRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticateRequest.getEmail(),
                        authenticateRequest.getPassword()
                )
        );

        var user = userRepo.findByEmail(authenticateRequest.getEmail())
                .orElseThrow();
        
        return jwtService.generateToken(user);
    }
}
