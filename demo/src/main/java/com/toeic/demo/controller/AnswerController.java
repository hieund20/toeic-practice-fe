package com.toeic.demo.controller;

import com.toeic.demo.dto.request.AnswerRequest;
import com.toeic.demo.dto.response.AnswerResponse;
import com.toeic.demo.service.IAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final IAnswerService answerService;

    @PostMapping
    public AnswerResponse create(@RequestBody AnswerRequest req) {
        return answerService.create(req);
    }

    @GetMapping("/question/{questionId}")
    public List<AnswerResponse> getByQuestion(@PathVariable UUID questionId) {
        return answerService.getByQuestion(questionId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        answerService.delete(id);
    }
}
