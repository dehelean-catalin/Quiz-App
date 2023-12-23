CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS quiz(
    id VARCHAR(255) PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration SMALLINT DEFAULT 5,
    questions_per_page SMALLINT DEFAULT 2,
    check_previous BOOLEAN DEFAULT TRUE

    CONSTRAINT positive_duration CHECK (duration > 0)
    CONSTRAINT positive_questions_per_page CHECK (questions_per_page > 0)
);



-- DROP TABLE quiz;