package com.toeic.demo.controller;

import com.toeic.demo.dto.request.TestPartRequest;
import com.toeic.demo.dto.response.TestPartResponse;
import com.toeic.demo.service.ITestPartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/test-parts")
@RequiredArgsConstructor
public class TestPartController {

    private final ITestPartService testPartService;

    @PostMapping
    public TestPartResponse create(@RequestBody TestPartRequest request) {
        return testPartService.create(request);
    }

    @GetMapping("/test/{testId}")
    public List<TestPartResponse> getByTest(@PathVariable UUID testId) {
        return testPartService.getByTest(testId);
    }

    @PutMapping("/{id}")
    public TestPartResponse update(@PathVariable UUID id,
                                   @RequestBody TestPartRequest request) {
        return testPartService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        testPartService.delete(id);
    }
}
