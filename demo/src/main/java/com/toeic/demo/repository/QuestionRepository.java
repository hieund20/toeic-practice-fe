package com.toeic.demo.repository;

import com.toeic.demo.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {
    List<Question> findByTestPartId(UUID testPartId);

    List<Question> findByGroupId(UUID groupId);
}
