package com.toeic.demo.service;

import com.toeic.demo.dto.request.CreateUserRequest;
import com.toeic.demo.dto.response.UserResponse;

public interface IUserService {
    UserResponse create(CreateUserRequest req);
}
