package com.toeic.demo.service;

import com.toeic.demo.dto.request.AnswerRequest;
import com.toeic.demo.dto.response.AnswerResponse;

import java.util.List;
import java.util.UUID;

public interface IAnswerService {
    AnswerResponse create(AnswerRequest req);

    List<AnswerResponse> getByQuestion(UUID questionId);

    void delete(UUID id);

}
