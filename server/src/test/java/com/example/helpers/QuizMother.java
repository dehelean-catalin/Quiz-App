package com.example.helpers;

import com.example.questions.Question;
import com.example.quizzes.Difficulty;
import com.example.quizzes.Quiz;
import com.example.quizzes.QuizSummaryDTO;

import java.util.ArrayList;
import java.util.List;

public class QuizMother {

    public static List<Question> getQuestions() {
        List<Question> questions = new ArrayList<>();
        questions.add(new Question());
        questions.add(new Question());

        return questions;
    }

    public static Quiz getQuiz(String id) {

        return Quiz.builder()
                .id(id)
                .title("HTML")
                .description("HTML Quiz")
                .duration(5)
                .difficulty(Difficulty.Easy)
                .allowBack(true)
                .questionsPerPage(5)
                .questions(getQuestions())
                .build();
    }

    public static QuizSummaryDTO getQuizSummaryDTO() {
        return QuizSummaryDTO.builder()
                .id("01234")
                .title("HTML")
                .description("HTML Quiz")
                .duration(5)
                .difficulty(Difficulty.Easy)
                .allowBack(true)
                .numberOfQuestions(5L)
                .questionsPerPage(2)
                .build();
    }
}
