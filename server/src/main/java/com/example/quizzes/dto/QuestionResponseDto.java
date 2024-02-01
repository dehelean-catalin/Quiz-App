package com.example.quizzes.dto;

import com.example.attempts.dto.AnswerDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponseDto {

    private String id;
    private String title;
    private Integer points;
    private List<AnswerDto> answers = new ArrayList<>();

}
