package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class SubmitTestResponse {
    private UUID attemptId;
    private Integer score;
    private Integer correct;
    private Integer total;
}
