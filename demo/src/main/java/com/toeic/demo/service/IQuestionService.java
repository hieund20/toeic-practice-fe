package com.toeic.demo.service;

import com.toeic.demo.dto.request.QuestionRequest;
import com.toeic.demo.dto.response.QuestionResponse;

import java.util.List;
import java.util.UUID;

public interface IQuestionService {
    List<QuestionResponse> getByPart(UUID partId);

    QuestionResponse create(QuestionRequest req);

    void delete(UUID id);

    QuestionResponse update(UUID id, QuestionRequest req);

    List<QuestionResponse> getByGroup(UUID groupId);
}
