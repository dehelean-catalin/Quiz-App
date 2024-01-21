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
	lastPage: boolean;
	allowBack: boolean;
	questions: IQuestion[];
};

export function Questions() {
	const { id, attemptId } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const size = searchParams.get("size");
	const page = searchParams.get("page");

	const { data, isLoading, error } = useFetch<QuestionPerPageResponse>(
		`${ROUTES.QUESTIONS}/${id}/attempts/${attemptId}`,
		{
			params: {
				page,
				size,
			},
		}
	);

	const path = `/quizzes/${id}/${ROUTES.QUESTIONS}/${attemptId}`;

	const defaultValues = initializeFormValues(data?.questions);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	async function onSubmit(formValues: Record<string, string[]>) {
		// TODO AUTO-FINISH IF TIME EXPIRES

		clearState(formValues, defaultValues);

		try {
			if (data?.lastPage) {
				await axiosInstance.post(
					`${ROUTES.ATTEMPTS}/${attemptId}/finish`,
					formValues
				);

				const path = `/quizzes/${attemptId}/results`;
				navigate(path, { replace: true });
				return;
			} else {
				await axiosInstance.post(
					`${ROUTES.ATTEMPTS}/${attemptId}/questions`,
					formValues
				);
			}

			const nextPage = Number(page) + 1;
			const replace = !data?.allowBack;

			navigate(`${path}?page=${nextPage}&size=${size}`, { replace });
		} catch (error) {
			console.log(error);
		}
	}

	function onGoBack() {
		const prevPage = Number(page) - 1;

		navigate(`${path}?page=${prevPage}&size=${size}`);
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

				{data.allowBack && Number(page) !== 0 && (
					<button type="button" onClick={onGoBack}>
						Back
					</button>
				)}

				<button type="submit">{data.lastPage ? "Finish" : "Next"}</button>
			</form>
		</div>
	);
}

function initializeFormValues(questions: IQuestion[] | undefined) {
	if (!questions || !questions.length) {
		return {};
	}

	const defaultValues: Record<string, string[]> = {};

	questions.map(({ id }) => (defaultValues[id] = []));

	return defaultValues;
}

function clearState(
	formValues: Record<string, string[]>,
	defaultValues: Record<string, string[]>
) {
	Object.keys(formValues).map((key) => {
		if (!defaultValues[key]) {
			delete formValues[key];
		}
	});
}
