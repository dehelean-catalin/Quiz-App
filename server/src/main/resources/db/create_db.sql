-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS answers, questions, quizzes;

CREATE TABLE quizzes(
    id VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration SMALLINT DEFAULT 5 NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    questions_per_page SMALLINT DEFAULT 2 NOT NULL,
    check_previous BOOLEAN DEFAULT TRUE,

    CONSTRAINT positive_duration CHECK (duration > 0),
    CONSTRAINT positive_questions_per_page CHECK (questions_per_page > 0),
    CONSTRAINT quizzes_difficulty_check CHECK (difficulty::text = ANY (ARRAY['Beginner'::character varying, 'Intermediate'::character varying, 'Advance'::character varying, 'Expert'::character varying]::text[]))
);

CREATE TABLE questions(
    id VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    points numeric DEFAULT 0 NOT NULL,
    quiz_id VARCHAR(255),

    CONSTRAINT positive_points CHECK (points > 0),
    CONSTRAINT fk_quizQuestion FOREIGN KEY (quiz_id)
    REFERENCES quizzes(id)
);

CREATE TABLE answers(
    id VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
    answer VARCHAR(255) NOT NULL,
    is_valid BOOLEAN NOT NULL,
    question_id VARCHAR(255),

    CONSTRAINT fk_question_answer FOREIGN KEY (question_id)
    REFERENCES questions(id)
);
