import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FieldInput } from "../../components/FieldInput";
import { FieldTextarea } from "../../components/FieldTextarea";
import { ROUTES } from "../../config/routes";
import { Difficulty } from "../quizzes/types/quizType";
import styles from "./CreateQuiz.module.css";
import QuestionList from "./components/QuestionList/QuestionList";
import { QuizFormData, quizSchema } from "./schemas";
import { postQuiz } from "./services/postQuiz.service";

const DEFAULT_VALUES = {
	difficulty: "Easy",
	duration: 5,
	questionsPerPage: 2,
	checkPrevious: false,
	questions: [],
};

export function CreateQuiz() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		control,
	} = useForm<QuizFormData>({
		resolver: yupResolver(quizSchema),
		defaultValues: { ...DEFAULT_VALUES },
	});

	function handleCheckChange(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value == "on" ? true : false;
		setValue("checkPrevious", input);
	}

	async function onSubmit(data: QuizFormData) {
		try {
			const resp = await postQuiz({
				...data,
				difficulty: Difficulty[data.difficulty as "0"],
			});
			alert(resp);
			navigate(`/${ROUTES.QUIZ}`);
			reset();
		} catch (error) {
			alert(JSON.stringify(error));
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<FieldInput
				label="Title *"
				id="title"
				register={register}
				errorMessage={errors.title?.message}
				placeholder="Enter quiz title"
			/>
			<FieldTextarea
				id="description"
				label="Description *"
				register={register}
				errorMessage={errors.description?.message}
				placeholder="Enter quiz description"
			/>
			<Controller
				control={control}
				name="difficulty"
				render={({ field: { onChange, onBlur, value } }) => (
					<FieldInput
						label={
							<>
								Difficulty
								<span className={styles.difficulty}>
									({Difficulty[value as "0"] || "Easy"})
								</span>
							</>
						}
						id="difficulty"
						inputType="range"
						min="0"
						max="2"
						defaultValue={0}
						onChange={onChange}
						onBlur={onBlur}
					/>
				)}
			/>

			<FieldInput
				label="Duration *"
				id="duration"
				inputType="number"
				register={register}
				errorMessage={errors.duration?.message}
			/>
			<FieldInput
				label="Questions per page *"
				id="questionsPerPage"
				inputType="number"
				register={register}
				errorMessage={errors.questionsPerPage?.message}
			/>
			<FieldInput
				label="Allow to check previous questions"
				id="checkPrevious"
				inputType="checkbox"
				onChange={handleCheckChange}
				errorMessage={errors.checkPrevious?.message}
			/>
			<QuestionList control={control} register={register} errors={errors} />
			<span className="error error-message">{errors.questions?.message}</span>

			<button type="submit">Submit</button>
		</form>
	);
}
