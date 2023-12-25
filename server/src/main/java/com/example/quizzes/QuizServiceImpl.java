package com.example.quizzes;

import com.example.answers.Answer;
import com.example.questions.Question;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return quizRepo.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Quiz with id - " + id +
                        " was not found"));
    }

    @Override
    public String save(Quiz quiz) {
        Quiz newQuiz = new Quiz(quiz.getTitle(),
                quiz.getDescription(),
                quiz.getDifficulty(),
                quiz.getDuration(),
                quiz.getQuestionsPerPage(),
                quiz.getCheckPrevious());

        for (Question question : quiz.getQuestions()) {
            Question newQuestion = new Question(question.getTitle(), question.getPoints());

            for (Answer answer : question.getAnswers()) {
                Answer newAnswer = new Answer(answer.getTitle(),
                        answer.getIsValid());
                newQuestion.addAnswer(newAnswer);
            }

            newQuiz.addQuestion(newQuestion);
        }

        quizRepo.save(newQuiz);

        return "Success";
    }
}
