package com.toeic.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "test")
@Data
public class Test {
    @Id
    private UUID id;

    private String title;

    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "test", fetch = FetchType.LAZY)
    private List<TestPart> parts;
}
