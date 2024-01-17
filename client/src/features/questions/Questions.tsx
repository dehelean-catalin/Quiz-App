import { useParams } from "react-router";
import { FetchError } from "../../components/FetchError/FetchError";
import { ROUTES } from "../../config/routes";
import { useFetch } from "../../shared/hooks";
import { IQuestion } from "../../shared/types/quizTypes";
import styles from "./Questions.module.css";
import { QuestionCard } from "./components/QuestionCard";

export function Questions() {
	const { id } = useParams();
	const { data, isLoading, error } = useFetch<IQuestion[]>(
		`${ROUTES.QUESTIONS}/${id}`,
		{ params: { page: 0, size: 2 } }
	);

	if (isLoading) return <>Loading...</>;

	if (error) return <FetchError error={error} />;

	if (!data) return;

	return (
		<div className={styles.container}>
			<form onSubmit={console.log}>
				{data.map((question) => (
					<QuestionCard value={question} />
				))}
				<button type="submit">Next</button>
			</form>
		</div>
	);
}
