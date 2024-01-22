package com.example.attempts;

import com.example.exceptions.ResourceUpdateNotAllowedException;
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

        Attempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new BadRequestException("Attempt not found"));

        Quiz quiz = quizRepo.findById(attempt.getQuizId())
                .orElseThrow(() -> new BadRequestException("Quiz not found"));

        return Utils.convertAttemptToQuizResult(quiz, attempt);
    }

    @Override
    public Attempt findById(String attemptId) throws BadRequestException {

        return attemptRepository.findById(attemptId)
                .orElseThrow(() -> new BadRequestException("Attempt not found"));
    }

    @Override
    public CreateAttemptResponse save(String quizId) throws BadRequestException {

        Quiz quiz = quizRepo.findById(quizId).orElseThrow(() -> new BadRequestException("Quiz not found"));

        LocalDateTime startDate = LocalDateTime.now();
        String endDate = startDate.plusMinutes(quiz.getDuration()).toString();

        Attempt attempt = new Attempt(quizId, startDate.toString(), endDate);

        Attempt save = attemptRepository.save(attempt);

        return new CreateAttemptResponse(save.getId(), startDate.toString());
    }

    @Override
    public String saveAnswers(String attemptId, Map<String, List<String>> answers) throws BadRequestException {

        Attempt attempt = attemptRepository.findById(attemptId).orElseThrow(() -> new BadRequestException("Attempt not found"));

        LocalDateTime localEndDateTime = LocalDateTime.parse(attempt.getEndTime());

        if (attempt.getIsCompleted()) {
            throw new ResourceUpdateNotAllowedException("Attempt is closed");
        }

        if (Utils.hasExpired(localEndDateTime)) {
            attempt.setIsCompleted(true);
            throw new ResourceUpdateNotAllowedException("Attempt is closed");
        }

        answers.forEach((questionId, answersId) -> updateSavedAnswers(questionId, answersId, attempt));

        attemptRepository.save(attempt);

        return "Success";
    }

    @Override
    public String finishAttempt(String attemptId, Map<String, List<String>> answers) throws BadRequestException {

        Attempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new BadRequestException("Attempt not found"));

        LocalDateTime localEndDateTime = LocalDateTime.parse(attempt.getEndTime());

        if (attempt.getIsCompleted() || Utils.hasExpired(localEndDateTime)) {
            throw new ResourceUpdateNotAllowedException("Attempt is closed");
        }

        answers.forEach((questionId, answersId) -> updateSavedAnswers(questionId, answersId, attempt));

        attempt.setIsCompleted(true);
        attempt.setCompletedAt(LocalDateTime.now().toString());

        attemptRepository.save(attempt);

        return "Success";
    }


    private static void updateSavedAnswers(String questionId, List<String> answersId, Attempt attempt) {

        Optional<AttemptQuestions> first = attempt.getAttemptQuestions().stream()
                .filter(ans -> ans.getQuestionId().equals(questionId))
                .findFirst();

        first.ifPresentOrElse(
                existingAnswer -> existingAnswer.setAnswersId(answersId),
                () -> attempt.addAnswer(new AttemptQuestions(questionId, answersId))
        );
    }
}
