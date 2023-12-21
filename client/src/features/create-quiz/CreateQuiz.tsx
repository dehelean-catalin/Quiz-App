import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CreateQuiz.module.css";
import { postQuiz } from "./services/postQuiz.service";

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
	// const [questions, setQuestions] = useState<CreateQuestion[]>([
	// 	INITIAL_QUESTION,
	// ]);
	const [difficulty, setDifficulty] = useState(Difficulty.Beginner);

	function handleChangeDifficulty(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value;
		setDifficulty(input);
	}
	// const ref = useRef()

	// function handleClick() {
	// 	setQuestions([...questions, INITIAL_QUESTION]);
	// }

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const response = await postQuiz({
			title: formData.get("title") as string,
			description: formData.get("description") as string,
			duration: Number(formData.get("duration")),
			difficulty: formData.get("difficulty") as string,
			questionsPerPage: Number(formData.get("question-pages")),
			checkPrevious: formData.get("check-previous") == "on" ? true : false,
			questions: [],
			categories: [],
			subCategories: [],
		});

		console.log(response);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<label htmlFor="title">Title*</label>
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

			<label htmlFor="description">Description</label>
			<textarea
				name="description"
				id="description"
				cols={30}
				rows={10}
			></textarea>

			{Difficulty[difficulty]}

			<label htmlFor="duration">Duration (mins)</label>
			<input type="number" name="duration" id="duration" defaultValue={5} />

			<label htmlFor="question-pages">Questions per page</label>
			<input
				type="number"
				name="question-pages"
				id="question-pages"
				defaultValue={2}
			/>

			<label htmlFor="check-previous">Allow check previous questions</label>
			<input type="radio" name="check-previous" id="check-previous" />

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
