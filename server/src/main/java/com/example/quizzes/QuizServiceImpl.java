package com.example.quizzes;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepo quizRepo;

    public QuizServiceImpl(QuizRepo quizRepo) {
        this.quizRepo = quizRepo;
    }

    @Override
    public List<Quiz> findAll() {
        return quizRepo.findAll();
    }

    @Override
    public Quiz findById(String id) {
        Optional<Quiz> response = quizRepo.findById(id);
        if (response.isEmpty()) {
            throw new RuntimeException("Not found");
        }
        return response.get();
    }

    @Override
    public String save(Quiz quiz) {
        var response = quizRepo.save(quiz);
        return "Success";
    }
}
