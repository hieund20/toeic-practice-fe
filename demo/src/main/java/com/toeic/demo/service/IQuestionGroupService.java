package com.toeic.demo.service;

import com.toeic.demo.dto.request.QuestionGroupRequest;
import com.toeic.demo.dto.response.QuestionGroupResponse;

import java.util.List;
import java.util.UUID;

public interface IQuestionGroupService {

    QuestionGroupResponse create(QuestionGroupRequest req);

    List<QuestionGroupResponse> getByPart(UUID partId);

    QuestionGroupResponse update(UUID id, QuestionGroupRequest req);

    void delete(UUID id);


}
