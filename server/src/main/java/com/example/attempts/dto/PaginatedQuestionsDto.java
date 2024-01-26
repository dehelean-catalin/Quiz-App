package com.example.attempts.dto;

import com.example.questions.QuestionResponse;
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
    List<QuestionResponse> questions = new ArrayList<>();

    public PaginatedQuestionsDto(Boolean allowBack, List<QuestionResponse> questionResponses) {
        this.allowBack = allowBack;
        this.questions.addAll(questionResponses);

    }
}
