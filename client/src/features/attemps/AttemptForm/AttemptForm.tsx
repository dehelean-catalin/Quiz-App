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
import useFocus from "../hooks/useFocus";
import { attemptService } from "../services/attemptService";
import { PaginatedQuestionsDto } from "../types/attemptResultTypes";
import styles from "./AttemptForm.module.css";
import { AttemptHeader } from "./AttemptHeader";

export function AttemptForm() {
	const { id, attemptId } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const page = Number(searchParams.get("page"));
	useFocus(page, id, attemptId);

	const { data, error } = useFetch<PaginatedQuestionsDto>(
		`${ROUTES.ATTEMPTS}/${attemptId}/${ROUTES.QUESTIONS}/${id}`,
		{
			params: {
				page,
			},
		}
	);
	const defaultValues = initializeFormValues(data?.questions);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ defaultValues });

	const path = `/quizzes/${id}/${ROUTES.QUESTIONS}/${attemptId}`;
	const showBackBtn = data?.allowBack && page !== 0;

	async function onSubmit(formValues: Record<string, string[]>) {
		if (!attemptId || !page) {
			console.error("Invalid attempt id");
			return;
		}

		const newValues = clearState(formValues, defaultValues);

		if (data?.lastPage) {
			const resultsPath = `/quizzes/${attemptId}/results`;
			await attemptService.closeAttempt(newValues, attemptId, page);
			navigate(resultsPath, { replace: true });
			return;
		}

		await attemptService.postAnswers(newValues, attemptId, page);

		const nextPage = page + 1;
		const replace = !data?.allowBack;

		navigate(`${path}?page=${nextPage}`, { replace });
	}

	function onGoBack() {
		const prevPage = page - 1;

		navigate(`${path}?page=${prevPage}`);
	}

	if (error) return <FetchError error={error} />;

	if (!data) return <>No data</>;

	return (
		<div className="desktop-container">
			<AttemptHeader page={page} />
			<CountDown defaultValues={defaultValues} getValues={getValues} />
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

function clearState(
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
