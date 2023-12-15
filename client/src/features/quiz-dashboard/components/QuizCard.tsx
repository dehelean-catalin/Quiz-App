import { Quiz } from "../types/quizType";

type Prop = {
	value: Quiz;
};

export function QuizCard({ value }: Prop) {
	return (
		<article>
			<h3>{value.title}</h3>
			<p>{value.difficulty}</p>
			<p>{value.description}</p>
		</article>
	);
}
