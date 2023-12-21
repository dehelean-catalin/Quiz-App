package com.example.questions;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class QuestionServiceImpl implements QuestionService{

    private final QuestionRepo questionRepo;
    public QuestionServiceImpl(QuestionRepo questionRepo){
        this.questionRepo = questionRepo;
    }

   @Override
    public List<Question> findAll(){
        return questionRepo.findAll();
    }

    @Override
    public Question findById(String id) {
        Optional<Question> result = questionRepo.findById(id);

        if(result.isEmpty()){
            throw new RuntimeException("Question not found");
        }

        return result.get();
    }

    @Override
    public String save(Question question){
         questionRepo.save(question);
         return "Success";
    }

    @Override
    public String deleteById(String id) {
        questionRepo.deleteById(id);
        return "Success";
    }
}
