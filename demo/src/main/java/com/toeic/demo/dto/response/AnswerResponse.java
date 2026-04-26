package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class AnswerResponse {
    private UUID id;
    private String content;
    private Integer answerOrder;
}
