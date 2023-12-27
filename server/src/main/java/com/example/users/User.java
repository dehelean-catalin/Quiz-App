package com.example.users;

import com.example.quizzes.Quiz;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @NotNull
    @Column(unique = true)
    String name;
    @Email
    String email;

    String password;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    List<Quiz> quizzes = new ArrayList<>();
}
