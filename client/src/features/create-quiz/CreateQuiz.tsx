import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../config/axios.config";
import styles from "./CreateQuiz.module.css";
import { FieldArray } from "./components/FieldArray";
import { FieldInput } from "./components/FieldInput";
import { FieldTextarea } from "./components/FieldTextarea";
import { QuestionActionDialog } from "./components/QuestionActionDialog";
import { QuizFormData, quizSchema } from "./schemas/quiz.schema";
import { postQuiz } from "./services/postQuiz.service";

enum Difficulty {
	"Beginner",
	"Intermediate",
	"Advance",
	"Expert",
}

const DEFAULT_VALUES = {
	difficulty: "Beginner",
	duration: 5,
	questionsPerPage: 2,
	checkPrevious: false,
	questions: [
		{
			title: "First question",
			points: 1,
			answers: [
				{ answer: "Answer 1", isValid: false },
				{ answer: "Answer 1", isValid: false },
				{ answer: "Answer 1", isValid: false },
				{ answer: "Answer 1", isValid: false },
			],
		},
	],
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
			/>
			<FieldTextarea
				id="description"
				label="Description *"
				register={register}
				errorMessage={errors.description?.message}
			/>
			<Controller
				control={control}
				name="difficulty"
				render={({ field: { onChange, onBlur, value } }) => (
					<div>
						<FieldInput
							label="Difficulty"
							id="difficulty"
							inputType="range"
							min="0"
							max="3"
							defaultValue="0"
							onChange={onChange}
							onBlur={onBlur}
						/>
						{Difficulty[value as "0"]}
					</div>
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
				label="Allow check previous questions"
				id="checkPrevious"
				inputType="checkbox"
				onChange={handleCheckChange}
				errorMessage={errors.checkPrevious?.message}
			/>
			<div>
				Questions:
				<QuestionActionDialog />
				<FieldArray control={control} register={register} errors={errors} />
			</div>

			<button type="submit">Submit</button>
		</form>
	);
}
