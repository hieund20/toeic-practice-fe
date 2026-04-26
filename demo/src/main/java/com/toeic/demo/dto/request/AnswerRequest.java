package com.toeic.demo.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class AnswerRequest {
    private UUID questionId;
    private String content;
    private Boolean isCorrect;
    private Integer answerOrder;
}
