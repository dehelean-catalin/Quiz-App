package com.example.quizzes;

import com.example.questions.Question;
import com.example.questions.QuestionRepo;
import org.apache.coyote.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizServiceImplTests {

    @Mock
    private QuizRepo quizRepo;
    @Mock
    private QuestionRepo questionRepo;

    @InjectMocks
    private QuizServiceImpl quizService;


    @Test
    void findById_whenWrongId_thenThrowBadRequestException() {

        String wrongId = "wrongId";

        when(quizRepo.findById(wrongId)).thenReturn(Optional.empty());

        BadRequestException badRequestException = assertThrows(BadRequestException.class, () -> quizService.findById(wrongId));
        assertEquals("Quiz with id " + wrongId + " was not found", badRequestException.getMessage());

    }

    @Test
    void findAllSummary() {
        List<Quiz> quizzes = new ArrayList<>();
        quizzes.add(new Quiz());

        when(quizRepo.findAll()).thenReturn(quizzes);

        List<QuizSummaryDTO> quizSummary = quizService.findAllSummary();

        assertThat(quizSummary.size()).isEqualTo(1);
    }

    @Test
    void saveQuiz() throws BadRequestException {
        Quiz quiz = new Quiz("0123", "hehe", "Hheheh");

        quiz.addQuestion(new Question());
        quiz.addQuestion(new Question());
        quiz.addQuestion(new Question());

        when(quizRepo.findById("0123")).thenReturn(Optional.of(quiz));
        when(questionRepo.countByQuizId(quiz.getId())).thenReturn(3L);

        QuizSummaryDTO quizSummary = quizService.findById("0123");

        assertThat(quizSummary.getNumberOfQuestions()).isEqualTo(3l);
    }
}