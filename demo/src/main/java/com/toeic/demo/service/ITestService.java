package com.toeic.demo.service;

import com.toeic.demo.dto.request.CreateTestRequest;
import com.toeic.demo.dto.request.UpdateTestRequest;
import com.toeic.demo.dto.response.TestResponse;
import com.toeic.demo.dto.response.TestSummaryResponse;
import com.toeic.demo.entity.Test;

import java.util.List;
import java.util.UUID;

public interface ITestService {
    TestResponse getFullTest(UUID testId);

    Test create(CreateTestRequest request);

    Test update(UUID id, UpdateTestRequest request);

    void delete(UUID id);

    List<TestSummaryResponse> getAll();
}
