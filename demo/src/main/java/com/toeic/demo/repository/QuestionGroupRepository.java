package com.toeic.demo.repository;

import com.toeic.demo.entity.QuestionGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionGroupRepository extends JpaRepository<QuestionGroup, UUID> {

    List<QuestionGroup> findByTestPartId(UUID testPartId);
}
