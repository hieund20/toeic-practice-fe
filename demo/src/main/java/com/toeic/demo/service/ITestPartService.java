package com.toeic.demo.service;

import com.toeic.demo.dto.request.TestPartRequest;
import com.toeic.demo.dto.response.TestPartResponse;

import java.util.List;
import java.util.UUID;

public interface ITestPartService {

    TestPartResponse create(TestPartRequest request);

    List<TestPartResponse> getByTest(UUID testId);

    TestPartResponse update(UUID id, TestPartRequest request);

    void delete(UUID id);
}
