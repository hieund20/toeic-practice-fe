package com.toeic.demo.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class QuestionRequest {
    private UUID testPartId;
    private UUID groupId;
    private String content;
    private String imageUrl;
    private String audioUrl;
    private Integer questionOrder;
}
