import { useNavigate, useParams } from "react-router";
import { FetchError } from "../../../components/FetchError/FetchError";
import { ROUTES } from "../../../config/routes";
import { useFetch } from "../../../shared/hooks";
import { useQuestionStore } from "../../attemps/store/questionStore";
import { QuizSummary } from "../../quizzes/types/quizType";
import { quizOverviewService } from "../services/quizOverviewService";

export default function QuizOverview() {
	const { id } = useParams();
	const navigate = useNavigate();
	const setQuestion = useQuestionStore((state) => state.setQuestion);

	const { data, isLoading, error } = useFetch<QuizSummary>(
		`${ROUTES.QUIZ}/${id}`
	);

	async function startAttempt() {
		if (!data || !id) {
			return;
		}

		const response = await quizOverviewService.createAttempt(id);
		const { numberOfQuestions, title, duration } = data;

		setQuestion({
			numberOfQuestions,
			title,
			duration,
			startDate: response.startDate,
			questionsPerPage: data.questionsPerPage,
		});

		navigate(`${ROUTES.QUESTIONS}/${response.id}?page=0`);
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
