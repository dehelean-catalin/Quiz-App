package com.example.questions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionPerPageResponse {

    private boolean finish;
    private boolean allowBack;
    List<QuestionResponse> questions = new ArrayList<>();

    public QuestionPerPageResponse(Boolean allowBack) {
        this.allowBack = allowBack;
    }
}
