import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router";
import { FetchError } from "../../../components/FetchError/FetchError";
import { axiosInstance } from "../../../config/axios.config";
import { ROUTES } from "../../../config/routes";
import { useFetch } from "../../../shared/hooks";
import { QuizSummary } from "../../quizzes/types/quizType";

export default function QuizOverview() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, error } = useFetch<QuizSummary>(
		`${ROUTES.QUIZ}/${id}`
	);

	async function startAttempt() {
		let attemptId = null;
		try {
			attemptId = await axiosInstance.post<AxiosResponse<string>>(
				`${ROUTES.ATTEMPTS}/${id}`
			);
		} catch (error) {
			alert(error?.message ?? "Something went wrong");
			return;
		}

		navigate(
			`${ROUTES.QUESTIONS}/${attemptId.data}?page=0&size=${data?.questionsPerPage}`
		);
	}

	if (isLoading) return <>Loading...</>;

	if (error) return <FetchError error={error} />;

	if (!data) return <>NO DATA</>;

	return (
		<div className="desktop-container">
			<article className="card pointer">
				<h3>{data.title}</h3>
				<p>{data.description}</p>

				<p>{data.duration} minutes</p>
				<p>{data.numberOfQuestions} questions</p>

				<footer>
					<button onClick={startAttempt}>Start</button>
				</footer>
			</article>
		</div>
	);
}
