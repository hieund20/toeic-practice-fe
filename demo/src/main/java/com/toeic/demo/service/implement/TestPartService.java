package com.toeic.demo.service.implement;

import com.toeic.demo.dto.request.TestPartRequest;
import com.toeic.demo.dto.response.TestPartResponse;
import com.toeic.demo.entity.Test;
import com.toeic.demo.entity.TestPart;
import com.toeic.demo.repository.TestPartRepository;
import com.toeic.demo.repository.TestRepository;
import com.toeic.demo.service.ITestPartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TestPartService implements ITestPartService {

    private final TestPartRepository testPartRepository;
    private final TestRepository testRepository;

    @Override
    public TestPartResponse create(TestPartRequest request) {
        Test test = testRepository.findById(request.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        TestPart part = new TestPart();
        part.setTest(test);
        part.setPartNumber(request.getPartNumber());

        TestPart saved = testPartRepository.save(part);

        return new TestPartResponse(saved.getId(), saved.getPartNumber());
    }

    @Override
    public List<TestPartResponse> getByTest(UUID testId) {
        return testPartRepository.findByTestIdOrderByPartNumberAsc(testId)
                .stream()
                .map(p -> new TestPartResponse(p.getId(), p.getPartNumber()))
                .toList();
    }

    @Override
    public TestPartResponse update(UUID id, TestPartRequest request) {
        TestPart part = testPartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TestPart not found"));

        if (request.getPartNumber() != null) {
            part.setPartNumber(request.getPartNumber());
        }

        TestPart updated = testPartRepository.save(part);

        return new TestPartResponse(updated.getId(), updated.getPartNumber());
    }

    @Override
    public void delete(UUID id) {
        testPartRepository.deleteById(id);
    }
}
