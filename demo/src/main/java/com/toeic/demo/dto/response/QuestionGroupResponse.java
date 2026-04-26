package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class QuestionGroupResponse {

    private UUID id;
    private String title;
    private String content;
    private String audioUrl;
    private String imageUrl;
}
