package com.example.questions;

import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepo questionRepo;

    public QuestionServiceImpl(QuestionRepo questionRepo) {
        this.questionRepo = questionRepo;
    }

    @Override
    public List<Question> findAllByQuizId(String id, Integer pageNumber, Integer pageSize) {
        Pageable pages = PageRequest.of(pageNumber, pageSize);
        return questionRepo.findAllByQuizId(id, pages);
    }

    @Override
    public Question findById(String id) throws BadRequestException {
        return questionRepo.findById(id).orElseThrow(() -> new BadRequestException("Question not found"));
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
