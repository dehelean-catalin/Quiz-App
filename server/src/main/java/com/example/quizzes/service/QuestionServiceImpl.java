package com.example.quizzes.service;

import com.example.quizzes.dao.model.Question;
import com.example.quizzes.dao.repository.QuestionRepo;
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
    public String save(Question question) {
        Question newQuestion = questionRepo.save(question);
        return newQuestion.getId();
    }

}
