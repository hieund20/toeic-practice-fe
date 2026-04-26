package com.toeic.demo.service;

import com.toeic.demo.dto.response.ReviewResponse;

import java.util.UUID;

public interface IReviewService {
    ReviewResponse getReview(UUID attemptId);
}
