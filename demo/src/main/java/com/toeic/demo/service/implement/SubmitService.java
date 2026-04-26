package com.toeic.demo.service.implement;

import com.toeic.demo.dto.request.SubmitTestRequest;
import com.toeic.demo.dto.response.SubmitTestResponse;
import com.toeic.demo.entity.*;
import com.toeic.demo.repository.*;
import com.toeic.demo.service.ISubmitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SubmitService implements ISubmitService {

    private final TestRepository testRepository;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final TestAttemptRepository attemptRepository;
    private final UserAnswerRepository userAnswerRepository;

    @Override
    public SubmitTestResponse submit(SubmitTestRequest req) {
        Test test = testRepository.findById(req.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        // 1. Create attempt
        TestAttempt attempt = new TestAttempt();
        attempt.setTest(test);
        attempt.setUserId(req.getUserId());
        attempt.setStartedAt(LocalDateTime.now());
        attempt.setSubmittedAt(LocalDateTime.now());

        attempt = attemptRepository.save(attempt);

        int correct = 0;

        // 2. Process answers
        for (SubmitTestRequest.AnswerSubmit a : req.getAnswers()) {

            Question question = questionRepository.findById(a.getQuestionId())
                    .orElseThrow();

            Answer selected = answerRepository.findById(a.getSelectedAnswerId())
                    .orElseThrow();

            boolean isCorrect = Boolean.TRUE.equals(selected.getIsCorrect());

            if (isCorrect) correct++;

            UserAnswer ua = new UserAnswer();
            ua.setAttempt(attempt);
            ua.setQuestion(question);
            ua.setSelectedAnswer(selected);
            ua.setIsCorrect(isCorrect);

            userAnswerRepository.save(ua);
        }

        int total = req.getAnswers().size();

        // 3. Calculate score (simple version)
        int score = (int) ((double) correct / total * 990);

        attempt.setScore(score);
        attemptRepository.save(attempt);

        // 4. Return result
        return new SubmitTestResponse(attempt.getId(), score, correct, total);
    }
}
