--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS quizzes(
    id VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration SMALLINT DEFAULT 5 NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    questions_per_page SMALLINT DEFAULT 2 NOT NULL,
    check_previous BOOLEAN DEFAULT TRUE,

    CONSTRAINT positive_duration CHECK (duration > 0),
    CONSTRAINT positive_questions_per_page CHECK (questions_per_page > 0),
    CONSTRAINT quizzes_difficulty_check CHECK (difficulty::text = ANY
    (ARRAY['Easy'::character varying, 'Medium'::character varying,
    'Hard'::character varying]::text[]))
);

CREATE TABLE IF NOT EXISTS  questions(
    id VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    points numeric DEFAULT 1 NOT NULL,

    CONSTRAINT positive_points CHECK (points > 0)
);

CREATE TABLE IF NOT EXISTS  answers(
    id SERIAL PRIMARY KEY,
    answer VARCHAR(255) NOT NULL,
    is_valid BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS quizzes_questions (
    quiz_id VARCHAR(255) REFERENCES quizzes,
    question_id VARCHAR(255) UNIQUE REFERENCES questions
);

CREATE TABLE IF NOT EXISTS questions_answers (
    question_id VARCHAR(255) REFERENCES questions ,
    answer_id SERIAL UNIQUE REFERENCES answers
);
