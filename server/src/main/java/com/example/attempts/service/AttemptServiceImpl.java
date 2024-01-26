package com.example.attempts.service;

import com.example.attempts.dao.Attempt;
import com.example.attempts.dao.AttemptQuestions;
import com.example.attempts.dao.AttemptRepository;
import com.example.attempts.dto.CreateAttemptResponse;
import com.example.attempts.dto.PaginatedQuestionsDto;
import com.example.attempts.dto.QuizResultResponse;
import com.example.attempts.exceptions.AttemptIllegalQuestionUpdateException;
import com.example.attempts.exceptions.AttemptIsCompletedException;
import com.example.attempts.exceptions.AttemptNotFoundException;
import com.example.questions.Question;
import com.example.questions.QuestionResponse;
import com.example.questions.QuestionService;
import com.example.quizzes.dao.Quiz;
import com.example.quizzes.dao.QuizRepo;
import com.example.quizzes.dto.QuizSummaryDTO;
import com.example.quizzes.exceptions.QuizNotFoundException;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.example.attempts.Utils.convertAttemptToQuizResult;
import static com.example.attempts.Utils.hasExpired;
import static com.example.quizzes.service.QuizHelpers.convertQuizToQuizSummaryDTO;

@Service
public class AttemptServiceImpl implements AttemptService {

    private final AttemptRepository attemptRepository;
    private final QuizRepo quizRepo;

    private final QuestionService questionService;

    public AttemptServiceImpl(AttemptRepository attemptRepository, QuizRepo quizRepo, QuestionService questionService) {
        this.attemptRepository = attemptRepository;
        this.quizRepo = quizRepo;
        this.questionService = questionService;
    }

    @Override
    public QuizResultResponse findQuizResult(String attemptId) throws BadRequestException {

        Attempt attempt = attemptRepository.findById(attemptId).orElseThrow(AttemptNotFoundException::new);

        Quiz quiz = quizRepo.findById(attempt.getQuizId()).orElseThrow(QuizNotFoundException::new);

        return convertAttemptToQuizResult(quiz, attempt);
    }

    @Override
    public Attempt findById(String attemptId) throws BadRequestException {

        return attemptRepository.findById(attemptId).orElseThrow(AttemptNotFoundException::new);
    }

    @Override
    public PaginatedQuestionsDto findPaginatedQuestions(String id, String attemptId, String page) throws BadRequestException {

        int pageNumber = Integer.parseInt(page);

        Attempt attempt =
                attemptRepository.findById(attemptId).orElseThrow(AttemptNotFoundException::new);

        int questionsPerPage = attempt.getQuestionsPerPage();

        List<Question> questions = questionService.findAllByQuizId(id, pageNumber, questionsPerPage);

        Quiz quiz = quizRepo.findById(id).orElseThrow(QuizNotFoundException::new);
        QuizSummaryDTO quizSummary = convertQuizToQuizSummaryDTO(quiz);

        if (attempt.getIsCompleted()) {
            throw new AttemptIsCompletedException();
        }

        List<QuestionResponse> questionResponsesDto = convertQuestionsToQuestionResponseDto(questions);

        PaginatedQuestionsDto paginatedQuestionsDto =
                new PaginatedQuestionsDto(quizSummary.isAllowBack(), questionResponsesDto);

        if (quizSummary.getNumberOfQuestions() <= (pageNumber + 1) * questionsPerPage) {
            paginatedQuestionsDto.setLastPage(true);
        }

        return paginatedQuestionsDto;
    }

    @Override
    public CreateAttemptResponse save(String quizId) throws BadRequestException {

        Quiz quiz = quizRepo.findById(quizId).orElseThrow(QuizNotFoundException::new);

        LocalDateTime startDate = LocalDateTime.now();
        String endDate = startDate.plusMinutes(quiz.getDuration()).toString();

        int numberOfPages = (int) (Math.floor(quiz.getQuestions().size() / quiz.getQuestionsPerPage()));

        Attempt attempt = new Attempt(quizId,
                startDate.toString(),
                endDate,
                quiz.getAllowBack(),
                numberOfPages,
                quiz.getQuestionsPerPage()
        );

        Attempt save = attemptRepository.save(attempt);

        return new CreateAttemptResponse(save.getId(), startDate.toString());
    }

    @Override
    public String saveAnswers(String attemptId, Map<String, List<String>> answers, String page) throws BadRequestException {

        Attempt attempt = attemptRepository.findById(attemptId).orElseThrow(AttemptNotFoundException::new);

        LocalDateTime localEndDateTime = LocalDateTime.parse(attempt.getEndTime());

        int previousPage = Integer.parseInt(page);

        if (attempt.getIsCompleted()) {
            throw new AttemptIsCompletedException();
        }

        if (hasExpired(localEndDateTime)) {
            attempt.setIsCompleted(true);
            attempt.setCompletedAt(localEndDateTime.toString());
            throw new AttemptIsCompletedException();
        }

        if (attempt.getCurrentPage() >= previousPage && !attempt.isAllowedBack()) {
            throw new AttemptIllegalQuestionUpdateException();
        }

        answers.forEach((questionId, answersId) -> updateSavedAnswers(questionId, answersId, attempt));
        attempt.setCurrentPage(previousPage);
        
        Attempt savedAttempt = attemptRepository.save(attempt);

        return savedAttempt.getId();
    }

    @Override
    public String closeAttempt(String attemptId, Map<String, List<String>> answers, String page) throws BadRequestException {

        Attempt attempt = attemptRepository.findById(attemptId).orElseThrow(AttemptNotFoundException::new);

        LocalDateTime localEndDateTime = LocalDateTime.parse(attempt.getEndTime());

        int previousPage = Integer.parseInt(page);

        if (attempt.getIsCompleted()) {
            throw new AttemptIsCompletedException();
        }

        attempt.setIsCompleted(true);
        attempt.setCompletedAt(localEndDateTime.toString());

        if (attempt.getCurrentPage() >= previousPage && !attempt.isAllowedBack()) {
            throw new AttemptIllegalQuestionUpdateException();
        }

        answers.forEach((questionId, answersId) -> updateSavedAnswers(questionId, answersId, attempt));
        attempt.setCurrentPage(previousPage);

        Attempt savedAttempt = attemptRepository.save(attempt);

        return savedAttempt.getId();
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

    private static List<QuestionResponse> convertQuestionsToQuestionResponseDto(List<Question> questions) {
        ModelMapper modelMapper = new ModelMapper();

        return questions.stream().map(question -> modelMapper.map(question, QuestionResponse.class)).toList();
    }
}
