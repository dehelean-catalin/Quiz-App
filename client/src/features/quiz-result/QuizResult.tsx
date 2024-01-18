import { useParams } from "react-router";
import { ROUTES } from "../../config/routes";
import { useFetch } from "../../shared/hooks";
import { QuizResult } from "./quizResultTypes";

export function QuizResult() {
	const { attemptId } = useParams();
	const { data, isLoading, error } = useFetch<QuizResult>(
		`${ROUTES.ATTEMPTS}/${attemptId}`
	);

	if (isLoading) return <>Loading...</>;

	// TODO: add design;
	// TODO: add recent scores + add quiz Id to path params so you can get all attempts for this current quiz

	return (
		<div>
			<h1>{data?.title}</h1>
			<h2>{data?.totalScore}</h2>
			<div>
				{data?.questions.map((question) => (
					<p>
						{question.title}
						{question.score}
					</p>
				))}
			</div>
		</div>
	);
}
