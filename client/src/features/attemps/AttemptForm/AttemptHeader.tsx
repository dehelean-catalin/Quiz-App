import { useAttemptDetails } from "../hooks/useAttemptDetails";
import styles from "./AttemptHeader.module.css";

export function AttemptHeader({ page }: { page: number }) {
	const { title, numberOfQuestions, numberOfCompletedQuestions } =
		useAttemptDetails(page);

	if (!title) {
		return;
	}

	return (
		<header className={styles.header}>
			<h1>{title}</h1>
			<p>
				{numberOfCompletedQuestions}/{numberOfQuestions} questions
			</p>
		</header>
	);
}
