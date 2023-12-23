package com.example.answers;

import org.springframework.stereotype.Service;

@Service
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepo answerRepo;

    public AnswerServiceImpl(AnswerRepo answerRepo) {
        this.answerRepo = answerRepo;
    }
    
    @Override
    public String save(Answer answer) {
        answerRepo.save(answer);
        return "Success";
    }
}
