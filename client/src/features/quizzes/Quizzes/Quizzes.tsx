import { FetchError } from "../../../components/FetchError/FetchError";
import useFetch from "../../../hooks/useFetch";
import { QuizCard } from "../components/QuizCard";
import { Quiz } from "../types/quizType";
import styles from "./QuizDashboard.module.css";

export function Quizzes() {
	const { data, isLoading, error } = useFetch<Quiz[]>("quizzes");

	if (isLoading) return <>Loading...</>;

	if (error) return <FetchError error={error} />;

	return (
		<div className={styles.container}>
			<h1>Quizzes</h1>
			<div className={styles.grid}>
				{data?.map((quiz, key) => (
					<QuizCard key={key} value={quiz} />
				))}
			</div>
		</div>
	);
}
