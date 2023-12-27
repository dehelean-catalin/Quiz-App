import { FetchError } from "../../../components";
import { useFetch } from "../../../shared/hooks";
import { QuizSummary } from "../types/quizType";
import { QuizCard } from "./QuizCard/QuizCard";
import styles from "./QuizList.module.css";

export default function QuizList() {
	const { data, isLoading, error } = useFetch<QuizSummary[]>("quizzes");

	if (isLoading) return <>Loading...</>;

	if (error) return <FetchError error={error} />;

	return (
		<div className={styles.grid}>
			{data?.map((quiz, key) => (
				<QuizCard key={key} value={quiz} />
			))}
		</div>
	);
}
