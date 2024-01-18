package com.example.attemps;

import com.example.quizzes.Quiz;
import com.example.quizzes.QuizRepo;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AttemptServiceImpl implements AttemptService {

    private final AttemptRepository attemptRepository;
    private final QuizRepo quizRepo;

    public AttemptServiceImpl(AttemptRepository attemptRepository, QuizRepo quizRepo) {
        this.attemptRepository = attemptRepository;
        this.quizRepo = quizRepo;
    }

    @Override
    public QuizResultResponse findQuizResult(String attemptId) throws BadRequestException {
        Attempt attempt =
                attemptRepository.findById(attemptId).orElseThrow(() -> new BadRequestException(
                        "Attempt" +
                                " not found"));

        Quiz quiz = quizRepo.findById(attempt.getQuizId()).orElseThrow(() -> new BadRequestException(
                "Quiz " +
                        "not " +
                        "found"));

        return Utils.convertAttemptToQuizResult(quiz, attempt);
    }

    @Override
    public String save(String id) {
        Attempt attempt = new Attempt();
        attempt.setQuizId(id);
        attempt.setStartTime(LocalDateTime.now().toString());

        Attempt save = attemptRepository.save(attempt);

        return save.getId();
    }

    @Override
    public String saveAnswers(String attemptId, Map<String, List<String>> answers) throws BadRequestException {

        Attempt attempt =
                attemptRepository.findById(attemptId).orElseThrow(() -> new BadRequestException());

        answers.forEach((questionId, answersId) ->
                {
                    Optional<AttemptQuestions> existingAnswer = attempt.getAttemptAnswers().stream()
                            .filter(ans -> ans.getQuestionId().equals(questionId)).findAny();

                    if (existingAnswer.isPresent()) {
                        existingAnswer.get().setAnswersId(answersId);
                    } else {
                        attempt.addAnswer(new AttemptQuestions(questionId, answersId));
                    }
                }
        );

        attemptRepository.save(attempt);

        return "Success";
    }
}
