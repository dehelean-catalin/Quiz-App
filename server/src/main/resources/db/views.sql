CREATE VIEW quiz_details AS
    SELECT q.title,
           q.id,
           q.description
      FROM quizzes q;