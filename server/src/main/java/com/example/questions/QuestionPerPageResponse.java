package com.example.questions;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionPerPageResponse {

    private boolean isLastPage;
    private boolean allowBack;
    List<QuestionResponse> questions = new ArrayList<>();

    public QuestionPerPageResponse(Boolean allowBack) {
        this.allowBack = allowBack;
    }
}
