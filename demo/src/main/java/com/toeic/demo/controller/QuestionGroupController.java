package com.toeic.demo.controller;

import com.toeic.demo.dto.request.QuestionGroupRequest;
import com.toeic.demo.dto.response.QuestionGroupResponse;
import com.toeic.demo.service.implement.QuestionGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/question-groups")
@RequiredArgsConstructor
public class QuestionGroupController {

    private final QuestionGroupService service;

    @PostMapping
    public QuestionGroupResponse create(@RequestBody QuestionGroupRequest req) {
        return service.create(req);
    }

    @GetMapping("/part/{partId}")
    public List<QuestionGroupResponse> getByPart(@PathVariable UUID partId) {
        return service.getByPart(partId);
    }

    @PutMapping("/{id}")
    public QuestionGroupResponse update(@PathVariable UUID id,
                                        @RequestBody QuestionGroupRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
