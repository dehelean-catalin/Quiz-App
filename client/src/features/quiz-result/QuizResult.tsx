import { useParams } from "react-router";
import { ROUTES } from "../../config/routes";
import { useFetch } from "../../shared/hooks";
import styles from "./QuizResult.module.css";
import { QuizResult } from "./quizResultTypes";

export function QuizResult() {
	const { attemptId } = useParams();
	const { data, isLoading, error } = useFetch<QuizResult>(
		`${ROUTES.ATTEMPTS}/${attemptId}`
	);

	if (isLoading) return <>Loading...</>;
	if (error) return <>Error...</>;

	// TODO: add recent scores + add quiz Id to path params so you can get all attempts for this current quiz

	return (
		<div className={styles.results}>
			<h1>{data?.title}</h1>
			<h2>{data?.startTime}</h2>
			<h2>{data?.endTime}</h2>
			<h2>{data?.totalScore}</h2>
			<div>
				{data?.questions.map((question) => (
					<p className="card">
						{question.title}
						{question.score}

						{question.answers.map((answer) => (
							<div> {answer.answer}</div>
						))}
					</p>
				))}
			</div>
			Previous Attemts
		</div>
	);
}
