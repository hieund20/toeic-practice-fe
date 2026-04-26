package com.toeic.demo.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class TestPartRequest {
    private UUID testId;
    private Integer partNumber;
}
