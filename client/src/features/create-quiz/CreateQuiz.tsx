import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CreateQuiz.module.css";
import { CreateQuestion } from "./types/createQuiz";

const INITIAL_QUESTION = {
	title: "",
	answers: [],
	validAnswers: [],
	points: 0,
};

enum Difficulty {
	"Beginner",
	"Intermediate",
	"Advanced",
	"Expert",
}

export function CreateQuiz() {
	const [questions, setQuestions] = useState<CreateQuestion[]>([
		INITIAL_QUESTION,
	]);
	const [difficulty, setDifficulty] = useState(Difficulty.Beginner);

	function handleChangeDifficulty(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value;
		setDifficulty(input);
	}

	function handleClick() {
		setQuestions([...questions, INITIAL_QUESTION]);
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		console.log(e);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<label htmlFor="title">Title</label>
			<input type="text" name="title" id="title" />

			<label htmlFor="difficulty">Difficulty</label>
			<input
				value={difficulty}
				onChange={handleChangeDifficulty}
				type="range"
				name="difficulty"
				id="difficulty"
				min="0"
				max="3"
			/>

			{Difficulty[difficulty]}

			<label htmlFor="duration">Duration (mins)</label>
			<input type="number" name="duration" id="duration" />

			<label htmlFor="question-pages">Questions per page</label>
			<input type="number" name="question-pages" id="question-pages" />

			<label htmlFor="allow-back">Allow go back</label>
			<input type="radio" name="allow-back" id="allow-back" />

			{/* {questions.map((question, index) => (
				<QuestionField key={index} index={index} value={question} />
			))} */}
			{/* <button type="button" onClick={handleClick}>
				Add new quiz
			</button> */}

			<button type="submit">Submit</button>
		</form>
	);
}
