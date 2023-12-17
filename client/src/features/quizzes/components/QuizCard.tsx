import { useNavigate } from "react-router";
import { Quiz } from "../types/quizType";

type Prop = {
	value: Quiz;
};

export function QuizCard({ value }: Prop) {
	const navigate = useNavigate();

	function handleClick() {
		navigate(`${value.id}`);
	}

	return (
		<article className="card pointer" onClick={handleClick}>
			<h3>{value.title}</h3>
			<p>{value.difficulty}</p>
			<p>{value.description}</p>
		</article>
	);
}
