import { useParams } from "react-router";
import { ROUTES } from "../../config/routes";
import { useFetch } from "../../shared/hooks";
import styles from "./QuizResult.module.css";
import { QuizResult } from "./quizResultTypes";
import { convertTimeDeltaIntoMinutes } from "./utils/convertTimeDeltaIntoMinutes";
import { formatDateTimeString } from "./utils/dateUtil";

export function QuizResult() {
	const { attemptId } = useParams();
	const { data, isLoading, error } = useFetch<QuizResult>(
		`${ROUTES.ATTEMPTS}/${attemptId}`
	);

	if (isLoading) return <>Loading...</>;
	if (error) return <>Error...</>;
	if (!data) return;

	// TODO: add recent scores + add quiz Id to path params so you can get all attempts for this current quiz

	return (
		<div className={styles.results}>
			<article className="card">
				<h1 className={styles.title}>{data?.title}</h1>

				<h2>Result:</h2>
				<p>
					Grade: {data.totalScore} out of {data.totalPoints} (
					{data.scorePercentage}%)
				</p>
				<p>Started on: {formatDateTimeString(data.startTime)}</p>
				<p>Completed on: {formatDateTimeString(data.completedAt)}</p>

				<p>
					Time taken: {convertTimeDeltaIntoMinutes(data.timeDeltaInSeconds)}
				</p>
			</article>

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
		</div>
	);
}
