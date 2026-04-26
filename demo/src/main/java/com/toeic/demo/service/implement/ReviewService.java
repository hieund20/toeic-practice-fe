package com.toeic.demo.service.implement;

import com.toeic.demo.dto.response.AnswerReviewResponse;
import com.toeic.demo.dto.response.QuestionReviewResponse;
import com.toeic.demo.dto.response.ReviewResponse;
import com.toeic.demo.entity.Question;
import com.toeic.demo.entity.TestAttempt;
import com.toeic.demo.entity.UserAnswer;
import com.toeic.demo.repository.TestAttemptRepository;
import com.toeic.demo.repository.UserAnswerRepository;
import com.toeic.demo.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    private final TestAttemptRepository attemptRepository;
    private final UserAnswerRepository userAnswerRepository;

    @Override
    public ReviewResponse getReview(UUID attemptId) {
        TestAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        List<UserAnswer> userAnswers =
                userAnswerRepository.findByAttemptId(attemptId);

        List<QuestionReviewResponse> questions = userAnswers.stream().map(ua -> {

            Question q = ua.getQuestion();

            List<AnswerReviewResponse> answers = q.getAnswers().stream()
                    .map(a -> new AnswerReviewResponse(
                            a.getId(),
                            a.getContent(),
                            a.getIsCorrect()
                    ))
                    .toList();

            return new QuestionReviewResponse(
                    q.getId(),
                    q.getContent(),
                    answers,
                    ua.getSelectedAnswer() != null
                            ? ua.getSelectedAnswer().getId()
                            : null
            );

        }).toList();

        return new ReviewResponse(
                attempt.getScore(),
                questions
        );
    }
}
