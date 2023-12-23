package com.example.quizzes;

import com.example.questions.QuestionRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepo quizRepo;
    private final QuestionRepo questionRepo;

    public QuizServiceImpl(QuizRepo quizRepo, QuestionRepo questionRepo) {
        this.quizRepo = quizRepo;
        this.questionRepo = questionRepo;
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
        quizRepo.save(quiz);
        return "Success";
    }
}
