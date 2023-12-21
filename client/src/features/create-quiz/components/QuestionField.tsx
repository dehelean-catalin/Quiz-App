import { CreateQuestion } from "../types/createQuiz";

export function QuestionField({
	value,
	index,
}: {
	value: CreateQuestion;
	index: number;
}) {
	return (
		<div>
			<label htmlFor={`question-${index}`}>{value.title}</label>
			<input type="text" name={`question`} id="" />
			<>
				<h2>Answers:</h2>
				{value.answers.map((answer) => (
					<>{answer}</>
				))}
			</>
			<>
				<h2>Correct answers:</h2>
				{value.validAnswers.map((answer) => (
					<>{answer}</>
				))}
			</>
		</div>
	);
}
