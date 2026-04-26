package com.toeic.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class TestResponse {
    private UUID id;
    private String title;
    private List<PartResponse> parts;
}
