package com.toeic.demo.repository;

import com.toeic.demo.entity.Test;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TestRepository extends JpaRepository<Test, UUID> {

    //This avoids N+1 query problem
    @EntityGraph(attributePaths = {
            "parts",
            "parts.questions",
            "parts.groups"
    })
    Optional<Test> findWithFullStructureById(UUID id);
}
