package com.example.quizzes;

import com.example.quizzes.dao.model.Quiz;
import com.example.quizzes.dao.repository.QuizRepo;
import com.example.quizzes.dto.CreateQuizDTO;
import com.example.quizzes.dto.QuizSummaryDTO;
import com.example.quizzes.dto.converter.QuizConverter;
import com.example.quizzes.service.QuizServiceImpl;
import org.apache.coyote.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.example.helpers.QuizMother.*;
import static com.example.quizzes.dto.converter.QuizConverter.quizToQuizSummaryDTO;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizServiceImplTests {

    @Mock
    private QuizRepo quizRepo;

    @InjectMocks
    private QuizServiceImpl quizService;


    @Test
    void findById_whenBlankId_thenThrowBadRequestException() {

        String blankId = " ";

        when(quizRepo.findById(blankId)).thenReturn(Optional.empty());

        BadRequestException badRequestException = assertThrows(BadRequestException.class,
                () -> quizService.findById(blankId));
        assertEquals("Quiz with id " + blankId + " was not found", badRequestException.getMessage());

    }

    @Test
    void findById_whenWrongId_thenThrowBadRequestException() {

        String wrongId = "wrongId";

        when(quizRepo.findById(wrongId)).thenReturn(Optional.empty());

        //then
        BadRequestException badRequestException = assertThrows(BadRequestException.class, () -> quizService.findById(wrongId));
        assertEquals("Quiz with id " + wrongId + " was not found", badRequestException.getMessage());

    }

    @Test
    void findById_whenValidId_thenReturnQuizSummaryDTO() throws BadRequestException {

        String validId = "1234";

        Quiz quiz = createQuizMock(validId, 2);
        when(quizRepo.findById(validId)).thenReturn(Optional.ofNullable(quiz));

        QuizSummaryDTO expectedDto = quizToQuizSummaryDTO(quiz);

        QuizSummaryDTO resultDto = quizService.findById(validId);

        // Then
        assertNotNull(resultDto);
        assertEquals(expectedDto, resultDto);
    }


    @Test
    void findAllSummary_whenQuizzesFound_thenReturnQuizSummaryDTO() {
        List<Quiz> mockQuizzes = createListOfQuizzesMock(3);

        when(quizRepo.findAll()).thenReturn(mockQuizzes);

        List<QuizSummaryDTO> expectedDto = createExpectedQuizSummaries(mockQuizzes);

        List<QuizSummaryDTO> resultDto = quizService.findAllSummary();

        //then
        assertEquals(expectedDto, resultDto);
    }

    @Test
    void findAllSummary_whenQuizzesNotFound_thenReturnEmptyList() {

        when(quizRepo.findAll()).thenReturn(Collections.emptyList());

        List<QuizSummaryDTO> expectedDto = createExpectedQuizSummaries(Collections.emptyList());

        List<QuizSummaryDTO> resultDto = quizService.findAllSummary();

        //then
        assertEquals(expectedDto, resultDto);
    }

    @Test
    void save_whenQuizIsValid_thenReturnQuizId_1() throws BadRequestException {

        CreateQuizDTO createQuizDTO = createQuizDtoMock(3);

        Quiz quiz = QuizConverter.createQuizDtoToQuiz(createQuizDTO);

        Quiz expectedResult = QuizConverter.createQuizDtoToQuiz(createQuizDTO);
        expectedResult.setId("1234");

        when(quizRepo.save(quiz)).thenReturn(expectedResult);

        String resultId = quizService.save(createQuizDTO);

        assertEquals(resultId, expectedResult.getId());
    }

}