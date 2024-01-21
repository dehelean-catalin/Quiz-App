import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { FetchError } from "../../../components/FetchError/FetchError";
import { ROUTES } from "../../../config/routes";
import { useFetch } from "../../../shared/hooks";
import { IQuestion } from "../../../shared/types/quizTypes";
import { AttemptField } from "../AttemptField/AttemptField";
import { attemptService } from "../services/attemptService";
import styles from "./AttemptForm.module.css";

type QuestionPerPageResponse = {
	lastPage: boolean;
	allowBack: boolean;
	questions: IQuestion[];
};

export function AttemptForm() {
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
	const showBackBtn = data?.allowBack && Number(page) !== 0;

	const defaultValues = initializeFormValues(data?.questions);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	async function onSubmit(formValues: Record<string, string[]>) {
		if (!attemptId) {
			console.error("Invalid attempt id");
			return;
		}

		clearState(formValues, defaultValues);

		if (data?.lastPage) {
			await attemptService.postFinishAttempt(formValues, attemptId);

			const path = `/quizzes/${attemptId}/results`;
			navigate(path, { replace: true });
			return;
		}

		await attemptService.postAnswers(formValues, attemptId);

		const nextPage = Number(page) + 1;
		const replace = !data?.allowBack;

		navigate(`${path}?page=${nextPage}&size=${size}`, { replace });
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
					<AttemptField
						key={question.id}
						value={question}
						register={register}
						errorMessage={errors[question.id]?.message as string}
					/>
				))}

				{showBackBtn && (
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
