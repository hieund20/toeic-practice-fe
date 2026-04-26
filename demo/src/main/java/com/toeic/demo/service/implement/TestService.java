package com.toeic.demo.service.implement;

import com.toeic.demo.dto.request.CreateTestRequest;
import com.toeic.demo.dto.request.UpdateTestRequest;
import com.toeic.demo.dto.response.*;
import com.toeic.demo.entity.Question;
import com.toeic.demo.entity.Test;
import com.toeic.demo.entity.TestPart;
import com.toeic.demo.repository.TestRepository;
import com.toeic.demo.service.ITestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TestService implements ITestService {
    private final TestRepository testRepository;

    @Override
    public TestResponse getFullTest(UUID testId) {
        Test test = testRepository.findWithFullStructureById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        return new TestResponse(
                test.getId(),
                test.getTitle(),
                test.getParts().stream()
                        .sorted(Comparator.comparing(TestPart::getPartNumber))
                        .map(part -> new PartResponse(
                        part.getPartNumber(),

                        part.getQuestions().stream()
                                .filter(q -> q.getGroup() == null)
                                .map(this::mapQuestion)
                                .toList(),

                        part.getGroups().stream()
                                .map(group -> new GroupResponse(
                                        group.getId(),
                                        group.getContent(),
                                        group.getAudioUrl(),
                                        group.getQuestions().stream()
                                                .map(this::mapQuestion)
                                                .toList()
                                ))
                                .toList()
                )).toList()
        );
    }

    @Override
    public Test create(CreateTestRequest request) {
        Test test = new Test();
        test.setId(UUID.randomUUID());
        test.setTitle(request.getTitle());
        test.setDescription(request.getDescription());
        return testRepository.save(test);
    }

    @Override
    public Test update(UUID id, UpdateTestRequest request) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        test.setTitle(request.getTitle());
        test.setDescription(request.getDescription());

        return testRepository.save(test);
    }

    @Override
    public void delete(UUID id) {
        testRepository.deleteById(id);
    }

    @Override
    public List<TestSummaryResponse> getAll() {
        return testRepository.findAll().stream()
                .map(t -> new TestSummaryResponse(
                        t.getId(),
                        t.getTitle()
                ))
                .toList();
    }

    private QuestionResponse mapQuestion(Question q) {
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
