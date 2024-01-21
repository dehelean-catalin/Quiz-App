import { useSearchParams } from "react-router-dom";
import { AttemptForm } from "../AttemptForm/AttemptForm";
import { useQuestionStore } from "../store/questionStore";
import styles from "./Attempt.module.css";

export function Attempt() {
	const [searchParams] = useSearchParams();
	const question = useQuestionStore((state) => state.question);

	const size = Number(searchParams.get("size"));
	const page = Number(searchParams.get("page"));

	let questionsCount = (page + 1) * size;

	if (questionsCount > Number(question.numberOfQuestions)) {
		questionsCount = Number(question.numberOfQuestions);
	}

	return (
		<div className="desktop-container">
			{question.title && (
				<header className={styles.header}>
					<h1>{question.title}</h1>
					<p>
						{questionsCount}/{question.numberOfQuestions}
					</p>
				</header>
			)}
			<AttemptForm />
		</div>
	);
}
