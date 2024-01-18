import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { FetchError } from "../../components/FetchError/FetchError";
import { axiosInstance } from "../../config/axios.config";
import { ROUTES } from "../../config/routes";
import { useFetch } from "../../shared/hooks";
import { IQuestion } from "../../shared/types/quizTypes";
import styles from "./Questions.module.css";
import { QuestionCard } from "./components/QuestionCard";

type QuestionPerPageResponse = {
	finish: boolean;
	questions: IQuestion[];
};

export function Questions() {
	const { id, attemptId } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const size = searchParams.get("size");
	const page = searchParams.get("page");

	const { data, isLoading, error } = useFetch<QuestionPerPageResponse>(
		`${ROUTES.QUESTIONS}/${id}`,
		{
			params: {
				page,
				size,
			},
		}
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	async function onSubmit(formValues: Record<string, string[]>) {
		// TODO AUTO-FINISH IF TIME EXPIRES
		// TODO NO MORE GO BACK IF QUIZ IS FINISHED or you are not allowed to bo back.

		try {
			await axiosInstance.post(
				`${ROUTES.ATTEMPTS}/${attemptId}/questions`,
				formValues
			);

			if (data?.finish) {
				await axiosInstance.get(`${ROUTES.ATTEMPTS}/${attemptId}`);
				const path = `/quizzes/${attemptId}/results`;
				navigate(path, { replace: true });
				return;
			}
		} catch (error) {
			console.log(error);
		}

		const nextPage = Number(page) + 1;
		const path = `/quizzes/${id}/${ROUTES.QUESTIONS}/${attemptId}`;

		navigate(`${path}?page=${nextPage}&size=${size}`);
	}

	if (isLoading) return <>Loading...</>;

	if (error) return <FetchError error={error} />;

	if (!data) return <>No data</>;

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{data.questions.map((question) => (
					<QuestionCard
						key={question.id}
						value={question}
						register={register}
						errorMessage={errors[question.id]?.message as string}
					/>
				))}

				<button type="submit">{data.finish ? "Finish" : "Next"}</button>
			</form>
		</div>
	);
}
