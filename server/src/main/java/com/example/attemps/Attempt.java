package com.example.attemps;

import jakarta.persistence.Table;
import lombok.Data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Table(name = "attemps")
public class Attemp {

    private String id;

    private String quiz_id;

    private String start_time;

    private Map<String, List<String>> answers = new HashMap<>();
}
