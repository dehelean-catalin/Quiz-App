import { useForm } from "react-hook-form";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { IconButton } from "../../../components";
import { FetchError } from "../../../components/FetchError/FetchError";
import { ROUTES } from "../../../config/routes";
import { useFetch } from "../../../shared/hooks";
import { IQuestion } from "../../../shared/types/quizTypes";
import { AttemptField } from "../AttemptField/AttemptField";
import { CountDown } from "../CountDown/CountDown";
import { attemptService } from "../services/attemptService";
import { useQuestionStore } from "../store/questionStore";
import { QuestionPerPageResponse } from "../types/attemptResultTypes";
import styles from "./AttemptForm.module.css";

export function AttemptForm() {
	const { id, attemptId } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const question = useQuestionStore((state) => state.question);

	const size = searchParams.get("size");
	const page = searchParams.get("page");

	const { data, error } = useFetch<QuestionPerPageResponse>(
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
		getValues,
	} = useForm({ defaultValues });

	async function onSubmit(formValues: Record<string, string[]>) {
		if (!attemptId) {
			console.error("Invalid attempt id");
			return;
		}

		const newValues = clearState(formValues, defaultValues);

		if (data?.lastPage) {
			await attemptService.postFinishAttempt(newValues, attemptId);

			const path = `/quizzes/${attemptId}/results`;
			navigate(path, { replace: true });
			return;
		}

		await attemptService.postAnswers(newValues, attemptId);

		const nextPage = Number(page) + 1;
		const replace = !data?.allowBack;

		navigate(`${path}?page=${nextPage}&size=${size}`, { replace });
	}

	function onGoBack() {
		const prevPage = Number(page) - 1;

		navigate(`${path}?page=${prevPage}&size=${size}`);
	}

	if (error) return <FetchError error={error} />;

	if (!data) return <>No data</>;

	return (
		<div className="desktop-container">
			{question.duration && question.startDate && (
				<CountDown
					durationInMins={1}
					startDate={question.startDate}
					defaultValues={defaultValues}
					getValues={getValues}
				/>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				{data.questions.map((question) => (
					<AttemptField
						key={question.id}
						value={question}
						register={register}
						errorMessage={errors[question.id]?.message as string}
					/>
				))}
				<IconButton
					type="submit"
					className={styles["next-btn"]}
					text={data.lastPage ? "Submit" : "Next"}
					iconRight={data.lastPage ? <></> : <GoArrowRight />}
				/>
				{showBackBtn && (
					<IconButton
						text="Back"
						iconLeft={<GoArrowLeft />}
						onClick={onGoBack}
					/>
				)}
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

export function clearState(
	formValues: Record<string, string[]>,
	defaultValues: Record<string, string[]>
) {
	const newFormValues: Record<string, string[]> = {};

	Object.keys(formValues).map((key) => {
		if (defaultValues[key]) {
			newFormValues[key] = formValues[key];
		}
	});

	return newFormValues;
}
