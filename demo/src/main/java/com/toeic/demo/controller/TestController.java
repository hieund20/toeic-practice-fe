package com.toeic.demo.controller;

import com.toeic.demo.dto.request.CreateTestRequest;
import com.toeic.demo.dto.request.UpdateTestRequest;
import com.toeic.demo.dto.response.TestResponse;
import com.toeic.demo.dto.response.TestSummaryResponse;
import com.toeic.demo.entity.Test;
import com.toeic.demo.service.implement.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @GetMapping
    public List<TestSummaryResponse> getAll() {
        return testService.getAll();
    }

    @GetMapping("/{id}")
    public TestResponse getFullTest(@PathVariable UUID id) {
        return testService.getFullTest(id);
    }

    @PostMapping
    public Test create(@RequestBody CreateTestRequest request) {
        return testService.create(request);
    }

    @PutMapping("/{id}")
    public Test update(@PathVariable UUID id,
                       @RequestBody UpdateTestRequest request) {
        return testService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        testService.delete(id);
    }
}
