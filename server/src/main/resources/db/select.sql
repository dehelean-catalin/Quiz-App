SELECT
    q.id AS quiz_id,
    q.title AS quiz_title,
    q.description AS quiz_description,
    q.duration AS quiz_duration,
    q.difficulty AS quiz_difficulty,
    q.questions_per_page AS questions_per_page,
    q.check_previous AS check_previous,
    qq.id AS quiz_question_id,
    qq.question_id AS question_id,
    ques.title AS question_title,
    ques.points AS question_points
FROM
    quizzes q
JOIN
    quiz_question qq ON q.id = qq.quiz_id
JOIN
    questions ques ON qq.question_id = ques.id;
