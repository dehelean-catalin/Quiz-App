package com.example.attempts.dto;

import com.example.quizzes.dto.QuestionResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedQuestionsDto {

    private boolean isLastPage;
    private boolean allowBack;
    List<QuestionResponseDto> questions = new ArrayList<>();

    public PaginatedQuestionsDto(Boolean allowBack, List<QuestionResponseDto> questionResponsDtos) {
        this.allowBack = allowBack;
        this.questions.addAll(questionResponsDtos);

    }
}
