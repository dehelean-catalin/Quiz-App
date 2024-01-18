package com.example.attemps;

import com.example.answers.Answer;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
public class QuestionResult {

    private String id;
    private String title;

    private int score = 0;

    private List<String> yourAnswers = new ArrayList<>();

    private List<Answer> answers = new ArrayList<>();
}
