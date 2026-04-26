package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class GroupResponse {
    private UUID id;
    private String content;
    private String audioUrl;
    private List<QuestionResponse> questions;
}
