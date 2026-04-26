package com.toeic.demo.controller;

import com.toeic.demo.dto.request.QuestionRequest;
import com.toeic.demo.dto.response.QuestionResponse;
import com.toeic.demo.service.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final IQuestionService questionService;

    @PostMapping
    public QuestionResponse create(@RequestBody QuestionRequest req) {
        return questionService.create(req);
    }

    @GetMapping("/part/{partId}")
    public List<QuestionResponse> getByPart(@PathVariable UUID partId) {
        return questionService.getByPart(partId);
    }

    @GetMapping("/group/{groupId}")
    public List<QuestionResponse> getByGroup(@PathVariable UUID groupId) {
        return questionService.getByGroup(groupId);
    }

    @PutMapping("/{id}")
    public QuestionResponse update(@PathVariable UUID id,
                                   @RequestBody QuestionRequest req) {
        return questionService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        questionService.delete(id);
    }
}
