package com.toeic.demo.dto.request;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String email;
    private String name;
}
