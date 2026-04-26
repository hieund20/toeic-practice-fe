package com.toeic.demo.dto.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class SubmitTestRequest {

    private UUID testId;
    private UUID userId;

    private List<AnswerSubmit> answers;

    @Data
    public static class AnswerSubmit {
        private UUID questionId;
        private UUID selectedAnswerId;
    }
}
