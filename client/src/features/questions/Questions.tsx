import { useEffect, useState } from "react";
import { FetchError } from "../../components/FetchError/FetchError";
import { ROUTES, axiosInstance } from "../../config/axios.config";
import useFetch from "../../hooks/useFetch";
import { QuestionCard } from "./components/QuestionCard";
import { Question } from "./types/quizTestTypes";

export function Questions() {
	const { data, isLoading, error } = useFetch<string[]>(ROUTES.QUESTIONS);
	const [question, setQuestion] = useState<Question | null>(null);
	const [questionNumber, setQuestionNumber] = useState(0);

	async function fetchQuestion() {
		if (!data || !data.length) return;

		if (questionNumber >= data.length) return;

		try {
			const res = await axiosInstance.get<Question>(
				`${ROUTES.QUESTIONS}/${data[questionNumber]}`
			);
			setQuestion(res.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchQuestion();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, questionNumber]);

	if (isLoading) return <>Loading...</>;

	if (error) return <FetchError error={error} />;

	if (!question || !data) return;

	if (questionNumber >= data.length) {
		return <>Finish</>;
	}

	return (
		<>
			<QuestionCard
				value={question}
				onNext={() => setQuestionNumber(questionNumber + 1)}
				count={`${questionNumber + 1} of ${data.length}`}
			/>
		</>
	);
}
