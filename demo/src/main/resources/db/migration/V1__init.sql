-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- TEST
-- =========================
CREATE TABLE test (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TEST PART (1 → 7)
-- =========================
CREATE TABLE test_part (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID NOT NULL,
    part_number INT NOT NULL CHECK (part_number BETWEEN 1 AND 7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_test_part_test
        FOREIGN KEY (test_id)
        REFERENCES test(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_test_part_test_id ON test_part(test_id);

-- =========================
-- QUESTION GROUP
-- =========================
CREATE TABLE question_group (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_part_id UUID NOT NULL,
    title TEXT,
    content TEXT,
    audio_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_group_part
        FOREIGN KEY (test_part_id)
        REFERENCES test_part(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_group_part_id ON question_group(test_part_id);

-- =========================
-- QUESTION
-- =========================
CREATE TABLE question (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_part_id UUID NOT NULL,
    group_id UUID NULL,
    content TEXT,
    image_url TEXT,
    audio_url TEXT,
    question_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_question_part
        FOREIGN KEY (test_part_id)
        REFERENCES test_part(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_question_group
        FOREIGN KEY (group_id)
        REFERENCES question_group(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_question_part_id ON question(test_part_id);
CREATE INDEX idx_question_group_id ON question(group_id);

-- =========================
-- ANSWER
-- =========================
CREATE TABLE answer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    answer_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
        REFERENCES question(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_answer_question_id ON answer(question_id);

-- =========================
-- USER
-- =========================
CREATE TABLE app_user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TEST ATTEMPT
-- =========================
CREATE TABLE test_attempt (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    test_id UUID NOT NULL,
    score INT,
    started_at TIMESTAMP,
    submitted_at TIMESTAMP,

    CONSTRAINT fk_attempt_user
        FOREIGN KEY (user_id)
        REFERENCES app_user(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attempt_test
        FOREIGN KEY (test_id)
        REFERENCES test(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_attempt_user_id ON test_attempt(user_id);
CREATE INDEX idx_attempt_test_id ON test_attempt(test_id);

-- =========================
-- USER ANSWER
-- =========================
CREATE TABLE user_answer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL,
    question_id UUID NOT NULL,
    selected_answer_id UUID,
    is_correct BOOLEAN,

    CONSTRAINT fk_user_answer_attempt
        FOREIGN KEY (attempt_id)
        REFERENCES test_attempt(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_answer_question
        FOREIGN KEY (question_id)
        REFERENCES question(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_answer_selected
        FOREIGN KEY (selected_answer_id)
        REFERENCES answer(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_user_answer_attempt_id ON user_answer(attempt_id);
CREATE INDEX idx_user_answer_question_id ON user_answer(question_id);
