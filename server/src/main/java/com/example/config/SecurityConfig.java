package com.example.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter JwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> {
//                    auth.requestMatchers("/sign-up", "/authenticate").permitAll();
//                    auth.requestMatchers("/swagger-ui/index.html").permitAll();
//                    auth.requestMatchers("/api/v1/**").permitAll();
//                })
//                .sessionManagement(sessionManagement ->
//                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
////                .formLogin(Customizer.withDefaults())
////                .oauth2Login(Customizer.withDefaults())
//                .authenticationProvider(authenticationProvider)
//                .addFilterBefore(JwtAuthenticationFilter,
//                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
