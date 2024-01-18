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

    boolean finish = false;
    List<QuestionResponse> questions = new ArrayList<>();

}
