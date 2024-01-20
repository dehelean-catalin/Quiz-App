import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { useFetch } from "../../shared/hooks";
import { AnswerResult } from "./AnswerResult";
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

	return (
		<div className={styles.results}>
			<article className="card">
				<h1 className={styles.title}>{data.title}</h1>

				<h2>Result</h2>

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

			{data.questions.map((question) => (
				<article className={`card ${styles.question}`}>
					<header className={styles.header}>
						<h3>{question.title}</h3>
						<p>
							{question.score} / {question.points} points
						</p>
					</header>

					{question.answers.map((answer) => (
						<AnswerResult
							key={answer.id}
							answer={answer}
							yourAnswers={question.yourAnswers}
						/>
					))}
				</article>
			))}

			<NavLink to={`/${ROUTES.QUIZ}`} className={styles.finish}>
				Finish review
			</NavLink>
		</div>
	);
}
