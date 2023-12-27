package com.example.quizzes;

import com.example.answers.Answer;
import com.example.dtos.CreateQuizDTO;
import com.example.dtos.QuestionDTO;
import com.example.dtos.QuizSummaryDTO;
import com.example.questions.Question;
import com.example.questions.QuestionRepo;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        return quizRepo.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Quiz with id - " + id +
                        " was not found"));
    }

    @Override
    public List<QuizSummaryDTO> findAllSummary() {
        List<Quiz> quizzes = quizRepo.findAll();
        ModelMapper modelMapper = new ModelMapper();
        List<QuizSummaryDTO> quizSummaryDTOS = new ArrayList<>();


        quizzes.forEach((quiz) -> {
            QuizSummaryDTO quizSummaryDTO = modelMapper.map(quiz,
                    QuizSummaryDTO.class);
            Long numberOfQuestions = questionRepo.countByQuizId(quiz.getId());
            quizSummaryDTO.setNumberOfQuestions(numberOfQuestions);

            quizSummaryDTOS.add(quizSummaryDTO);
        });

        return quizSummaryDTOS;
    }

    @Override
    public List<QuestionDTO> findQuestionsByPage(String id, Pageable pageable) {
        return null;
    }

    @Override
    public String save(CreateQuizDTO quiz) throws BadRequestException {

        Quiz newQuiz = new Quiz(quiz.getTitle(),
                quiz.getDescription(),
                quiz.getDifficulty(),
                quiz.getDuration(),
                quiz.getQuestionsPerPage(),
                quiz.getCheckPrevious());

        for (Question question : quiz.getQuestions()) {
            Question newQuestion = new Question(question.getTitle(), question.getPoints());

            if (!question.getAnswers().stream().anyMatch(answer -> answer.getIsValid() == true)) {
                throw new BadRequestException("At least one valid answer is " +
                        "required");
            }

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
