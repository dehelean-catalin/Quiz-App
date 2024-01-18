package com.example.questions;

import com.example.answers.AnswerDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    private String id;
    private String title;
    private Integer points;
    private List<AnswerDTO> answers = new ArrayList<>();

}
