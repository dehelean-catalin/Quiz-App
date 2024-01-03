package com.example.users;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticateRequest {
    @NotNull(message = "Email is mandatory")
    @Email(message = "Invalid credentials",
            regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                    + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$",
            flags = Pattern.Flag.CASE_INSENSITIVE
    )
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Min(8)
    private String password;
}
