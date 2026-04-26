package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PartResponse {
    private Integer partNumber;
    private List<QuestionResponse> questions;
    private List<GroupResponse> groups;
}
