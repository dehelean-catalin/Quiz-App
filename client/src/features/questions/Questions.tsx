import { useParams } from "react-router";
import { FetchError } from "../../components/FetchError/FetchError";
import { ROUTES } from "../../config/axios.config";
import { useFetch } from "../../shared/hooks";
import { IQuestion } from "../../shared/types/quizTypes";

export function Questions() {
	const { id } = useParams();
	const { data, isLoading, error } = useFetch<IQuestion[]>(
		`${ROUTES.QUESTIONS}/${id}`,
		{ params: { page: 0, size: 2 } }
	);

	if (isLoading) return <>Loading...</>;

	if (error) return <FetchError error={error} />;

	if (!data) return;
	console.log(data);
	return (
		<>
			{data.map((question) => (
				<article>
					{question.title}
					{question.points}
					{question.answers.map((answer) => (
						<p>{answer.answer}</p>
					))}
				</article>
				// <QuestionCard value={val} onNext={console.log} count={""} />
			))}
		</>
	);
}
