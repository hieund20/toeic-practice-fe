package com.toeic.demo.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class QuestionGroupRequest {
    private UUID testPartId;
    private String title;
    private String content;
    private String audioUrl;
    private String imageUrl;
}
