package com.toeic.demo.service.implement;

import com.toeic.demo.dto.request.QuestionGroupRequest;
import com.toeic.demo.dto.response.QuestionGroupResponse;
import com.toeic.demo.entity.QuestionGroup;
import com.toeic.demo.entity.TestPart;
import com.toeic.demo.repository.QuestionGroupRepository;
import com.toeic.demo.repository.TestPartRepository;
import com.toeic.demo.service.IQuestionGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionGroupService implements IQuestionGroupService {

    private final QuestionGroupRepository repository;
    private final TestPartRepository testPartRepository;

    @Override
    public QuestionGroupResponse create(QuestionGroupRequest req) {

        TestPart part = testPartRepository.findById(req.getTestPartId())
                .orElseThrow(() -> new RuntimeException("TestPart not found"));

        QuestionGroup group = new QuestionGroup();
        group.setTestPart(part);
        group.setTitle(req.getTitle());
        group.setContent(req.getContent());
        group.setAudioUrl(req.getAudioUrl());
        group.setImageUrl(req.getImageUrl());

        QuestionGroup saved = repository.save(group);

        return map(saved);
    }

    @Override
    public List<QuestionGroupResponse> getByPart(UUID partId) {
        return repository.findByTestPartId(partId)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public QuestionGroupResponse update(UUID id, QuestionGroupRequest req) {
        QuestionGroup group = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.setTitle(req.getTitle());
        group.setContent(req.getContent());
        group.setAudioUrl(req.getAudioUrl());
        group.setImageUrl(req.getImageUrl());

        return map(repository.save(group));
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    private QuestionGroupResponse map(QuestionGroup g) {
        return new QuestionGroupResponse(
                g.getId(),
                g.getTitle(),
                g.getContent(),
                g.getAudioUrl(),
                g.getImageUrl()
        );
    }
}
