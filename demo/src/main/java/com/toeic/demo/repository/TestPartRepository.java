package com.toeic.demo.repository;

import com.toeic.demo.entity.TestPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TestPartRepository extends JpaRepository<TestPart, UUID> {

    List<TestPart> findByTestId(UUID testId);

    List<TestPart> findByTestIdOrderByPartNumberAsc(UUID testId);
}
