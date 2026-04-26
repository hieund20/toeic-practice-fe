package com.toeic.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "test_part")
@Getter
@Setter
public class TestPart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    @Column(name = "part_number")
    private Integer partNumber;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "testPart", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Question> questions;

    @OneToMany(mappedBy = "testPart", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<QuestionGroup> groups;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
