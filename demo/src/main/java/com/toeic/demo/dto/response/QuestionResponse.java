package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class QuestionResponse {
    private UUID id;
    private String content;
    private String imageUrl;
    private String audioUrl;
    private Integer questionOrder;
    private List<AnswerResponse> answers;
}
