import { useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { QuestionHeader } from "../../../components/QuestionCard";
import { ROUTES } from "../../../config/routes";
import { useFetch } from "../../../shared/hooks";
import { AnswerResult } from "../AnswerResult/AnswerResult";
import { useQuestionStore } from "../store/questionStore";
import { AttemptResult } from "../types/attemptResultTypes";
import { convertTimeDeltaIntoMinutes } from "../utils/convertTimeDeltaIntoMinutes";
import { formatDateTimeString } from "../utils/dateUtil";
import styles from "./AttemptResult.module.css";

export function AttemptResult() {
	const { attemptId } = useParams();
	const reset = useQuestionStore((state) => state.reset);
	const { data, isLoading, error } = useFetch<AttemptResult>(
		`${ROUTES.ATTEMPTS}/${attemptId}`
	);

	useEffect(reset, [reset]);

	if (isLoading) return <>Loading...</>;
	if (error) return <>Error...</>;
	if (!data) return <>No data</>;

	return (
		<div className={`${styles.results} desktop-container`}>
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
				<article key={question.id} className={`card ${styles.question}`}>
					<QuestionHeader
						title={question.title}
						points={`${question.score} / ${question.points}`}
					/>
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
