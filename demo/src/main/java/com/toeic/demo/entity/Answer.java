package com.toeic.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "answer")
@Data
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private String content;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "answer_order")
    private Integer answerOrder;
}
