import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../config/axios.config";
import styles from "./CreateQuiz.module.css";
import { FieldArray } from "./components/FieldArray";
import { FieldInput } from "./components/FieldInput";
import { FieldTextarea } from "./components/FieldTextarea";
import { QuizFormData, quizSchema } from "./schemas/quiz.schema";
import { postQuiz } from "./services/postQuiz.service";

enum Difficulty {
	"Beginner",
	"Intermediate",
	"Advanced",
	"Expert",
}

const DEFAULT_VALUES = {
	duration: 5,
	questionsPerPage: 2,
	checkPrevious: false,
	questions: [
		{
			title: "First question",
			points: 1,
			answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
			validAnswers: ["Answer 1"],
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

	function handleChangeDifficulty(e: ChangeEvent<HTMLInputElement>) {
		setValue("difficulty", Difficulty[Number(e.target.value)]);
	}
	function handleCheckChange(e: ChangeEvent<HTMLInputElement>) {
		const input = e.target.value == "on" ? true : false;

		setValue("checkPrevious", input);
	}

	async function onSubmit(data: QuizFormData) {
		await postQuiz(data);
		navigate(`/${ROUTES.QUIZ}`);
		reset();
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
			<FieldInput
				label="Difficulty"
				id="difficulty"
				inputType="range"
				min="0"
				max="3"
				onChange={handleChangeDifficulty}
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
				<FieldArray control={control} register={register} />
			</div>

			<button type="submit">Submit</button>
		</form>
	);
}
