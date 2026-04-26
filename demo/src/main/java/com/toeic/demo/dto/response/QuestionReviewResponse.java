package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class QuestionReviewResponse {
    private UUID questionId;
    private String content;
    private List<AnswerReviewResponse> answers;
    private UUID selectedAnswerId;
}
