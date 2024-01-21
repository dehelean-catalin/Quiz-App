import clsx from "clsx";
import { GoCheckCircleFill, GoXCircleFill } from "react-icons/go";
import { Answer } from "../types/attemptResultTypes";
import styles from "./AnswerResult.module.css";

type Props = {
	answer: Answer;
	yourAnswers: string[];
};

export function AnswerResult({ answer, yourAnswers }: Props) {
	const isAnswerInValid = !answer.isValid && yourAnswers.includes(answer.id);

	const answerClassName = clsx(
		{
			[styles.green]: answer.isValid,
			[styles.red]: isAnswerInValid,
		},
		styles.answer,
		"answer-card"
	);

	return (
		<div className={answerClassName}>
			{answer.answer}
			{isAnswerInValid ? (
				<GoXCircleFill size={20} />
			) : answer.isValid ? (
				<GoCheckCircleFill size={20} />
			) : (
				<></>
			)}
		</div>
	);
}
