package com.example.questions;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepo questionRepo;

    public QuestionServiceImpl(QuestionRepo questionRepo) {
        this.questionRepo = questionRepo;
    }

    @Override
    public List<Question> findAll() {
        return questionRepo.findAll();
    }

    @Override
    public Question findById(String id) {
        return questionRepo.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Questions not founded"));
    }

    @Override
    public String save(Question question) {
        questionRepo.save(question);
        return "Success";
    }

    @Override
    public String deleteById(String id) {
        questionRepo.deleteById(id);
        return "Success";
    }
}
