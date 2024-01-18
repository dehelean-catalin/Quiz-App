  --DELETE FROM quizzes WHERE id = '7aa3dcdb-e226-4352-ba96-fc906d42f1f6';

  
  INSERT INTO quizzes (id,title, description, duration, difficulty, questions_per_page, check_previous)
  VALUES
      (
      '7aa3dcdb-e226-4352-ba96-fc906d42f1f6',
      'HTML Basics',
      'Test your html skills',
       10,
      'Easy',
      3,
      TRUE
      );

  INSERT INTO questions (id, title, points) VALUES
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f2','What does HTML stand for?', 2),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f1','What is the purpose of the `DOCTYPE` declaration in HTML?', 1),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f3','Describe the difference between `<div>` and `<span>` in HTML.', 2),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f4','Explain the significance of the `alt` attribute in the `<img>` tag.', 1);

  INSERT INTO quizzes_questions(quiz_id, question_id) VALUES
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f6','7aa3dcdb-e226-4352-ba96-fc906d42f1f1'),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f6','7aa3dcdb-e226-4352-ba96-fc906d42f1f2'),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f6','7aa3dcdb-e226-4352-ba96-fc906d42f1f3'),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f6','7aa3dcdb-e226-4352-ba96-fc906d42f1f4');

  INSERT INTO answers (id, answer, is_valid)
  VALUES
      (1,'HTML (Hypertext Markup Language) is the standard markup language used to create the structure and content of web pages.', TRUE),
      (2,'HTML is a programming language for web development', FALSE),
      (3,'HTML stands for Hyper Transfer Markup Language', FALSE),
      (4,'HTML is used only for styling web pages', FALSE),
      (5,'`DOCTYPE` is not necessary in HTML', FALSE),
      (6,'`DOCTYPE` is used for defining CSS styles only', FALSE),
      (7,'`DOCTYPE` is used to declare variables in HTML', FALSE),
      (8,'The `DOCTYPE` declaration specifies the HTML version and document type, helping browsers to render the web page correctly', TRUE),
      (9,'`<div>` and `<span>` are both inline elements', FALSE),
      (10,'`<div>` and `<span>` serve the same purpose in HTML', FALSE),
      (11,'`<div>` and `<span>` are interchangeable and can be used in the same way', FALSE),
      (12,'`<div>` is a block-level element used for grouping other HTML elements, while `<span>` is an inline element typically used for applying styles or scripting to a specific part of text', TRUE),
      (13,'`alt` is used to set the image`s alignment', FALSE),
      (14,'`alt` is only necessary for decorative images', FALSE),
      (15,'`alt` is used to specify the image`s file format', FALSE),
      (16,'The `alt` attribute provides alternative text for an image, which is displayed if the image cannot be loaded. It also aids accessibility for users with visual impairments', TRUE);

   INSERT INTO questions_answers(answers_id, question_id) VALUES
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f1',1),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f1',2),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f1',3),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f1',4),

  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f2',5),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f2',6),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f2',7),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f2',8),

  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f3',9),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f3',10),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f3',11),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f3',12),

  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f4',13),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f4',14),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f4',15),
  ('7aa3dcdb-e226-4352-ba96-fc906d42f1f4',16);   

 