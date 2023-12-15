import useFetch from "../../../hooks/useFetch";
import { QuizCard } from "../components/QuizCard";
import { Quiz } from "../types/quizType";

export function QuizDashboard() {
	const { data, isLoading, error } = useFetch<Quiz[]>("quizzes");

	if (isLoading) return <></>;

	if (error) return <>error</>;

	return (
		<div>
			<h1>Quizzes</h1>
			{data?.map((quiz, key) => (
				<QuizCard key={key} value={quiz} />
			))}
		</div>
	);
}
