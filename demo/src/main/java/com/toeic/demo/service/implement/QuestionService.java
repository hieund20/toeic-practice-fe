package com.toeic.demo.service.implement;

import com.toeic.demo.dto.request.QuestionRequest;
import com.toeic.demo.dto.response.AnswerResponse;
import com.toeic.demo.dto.response.QuestionResponse;
import com.toeic.demo.entity.Question;
import com.toeic.demo.entity.QuestionGroup;
import com.toeic.demo.entity.TestPart;
import com.toeic.demo.repository.AnswerRepository;
import com.toeic.demo.repository.QuestionGroupRepository;
import com.toeic.demo.repository.QuestionRepository;
import com.toeic.demo.repository.TestPartRepository;
import com.toeic.demo.service.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {
    private final QuestionRepository questionRepository;
    private final QuestionGroupRepository questionGroupRepository;
    private final TestPartRepository testPartRepository;
    private final AnswerRepository answerRepository;

    public List<QuestionResponse> getByPart(UUID partId) {
        return questionRepository.findByTestPartId(partId)
                .stream().map(this::map).toList();
    }

    @Override
    public QuestionResponse create(QuestionRequest req) {
        TestPart part = testPartRepository.findById(req.getTestPartId())
                .orElseThrow(() -> new RuntimeException("TestPart not found"));

        Question q = new Question();
        q.setTestPart(part);
        q.setContent(req.getContent());
        q.setImageUrl(req.getImageUrl());
        q.setAudioUrl(req.getAudioUrl());
        q.setQuestionOrder(req.getQuestionOrder());

        if (req.getGroupId() != null) {
            QuestionGroup group = questionGroupRepository.findById(req.getGroupId())
                    .orElseThrow(() -> new RuntimeException("Group not found"));
            q.setGroup(group);
        }

        return map(questionRepository.save(q));
    }

    @Override
    public void delete(UUID id) {
        questionRepository.deleteById(id);
    }

    @Override
    public QuestionResponse update(UUID id, QuestionRequest req) {
        Question q = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        q.setContent(req.getContent());
        q.setImageUrl(req.getImageUrl());
        q.setAudioUrl(req.getAudioUrl());
        q.setQuestionOrder(req.getQuestionOrder());

        return map(questionRepository.save(q));
    }

    @Override
    public List<QuestionResponse> getByGroup(UUID groupId) {
        return questionRepository.findByGroupId(groupId)
                .stream().map(this::map).toList();
    }

    private QuestionResponse map(Question q) {
        return new QuestionResponse(
                q.getId(),
                q.getContent(),
                q.getImageUrl(),
                q.getAudioUrl(),
                q.getQuestionOrder(),
                q.getAnswers().stream()
                        .map(a -> new AnswerResponse(
                                a.getId(),
                                a.getContent(),
                                a.getAnswerOrder()
                        ))
                        .toList()
        );
    }
}
