CREATE TABLE IF NOT EXISTS quiz (
   id VARCHAR (255) PRIMARY KEY,
   description VARCHAR (50) UNIQUE NOT NULL,
   duration NUMERIC
);

-- INSERT INTO test (id, description, duration) VALUES (
--    'bun', 'bunbun', 12
-- );

SELECT * FROM test

-- DROP TABLE test