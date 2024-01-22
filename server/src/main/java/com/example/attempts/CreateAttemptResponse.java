package com.example.attempts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class CreateAttemptResponse {
    private String id;
    private String startDate;
}
