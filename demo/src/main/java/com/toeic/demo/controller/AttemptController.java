package com.toeic.demo.controller;

import com.toeic.demo.dto.response.ReviewResponse;
import com.toeic.demo.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {

    private final IReviewService reviewService;

    @GetMapping("/{id}/review")
    public ReviewResponse getReview(@PathVariable UUID id) {
        return reviewService.getReview(id);
    }
}
