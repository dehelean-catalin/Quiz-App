import { useNavigate, useParams } from "react-router";
import { FetchError } from "../../../components/FetchError/FetchError";
import { ROUTES } from "../../../config/axios.config";
import useFetch from "../../../hooks/useFetch";
import { Quiz } from "../../quizzes/types/quizType";

export default function QuizOverview() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, error } = useFetch<Quiz>(`${ROUTES.QUIZ}/${id}`);

	function handleClick() {
		navigate(ROUTES.TEST);
	}

	if (isLoading) return <>Loading</>;

	if (error) return <FetchError error={error} />;

	if (!data) return <>NO DATA</>;

	return (
		<article className="card pointer">
			<h3>{data.title}</h3>
			<p>{data.description}</p>

			<p>{data.duration} minutes</p>
			<p>{data.numberOfQuestions} questions</p>

			<footer>
				<button onClick={handleClick}>Start</button>
			</footer>
		</article>
	);
}
