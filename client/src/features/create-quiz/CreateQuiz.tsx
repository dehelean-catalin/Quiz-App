import { Switch } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
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
	allowBack: false,
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

	function handleCheckChange(e: boolean) {
		console.log(e);
		setValue("allowBack", e);
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
		<form
			className="grid gap-1 grid-cols-5 auto-cols-fr width-lg mx-auto my-20"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="col-start-1 col-end-3 font-semibold text-xl">
				Create quiz
			</h1>
			<FieldInput
				label="Title *"
				id="title"
				register={register}
				className="col-start-1 col-end-3"
				errorMessage={errors.title?.message}
				placeholder="Enter quiz title"
			/>
			<FieldTextarea
				id="description"
				label="Description *"
				register={register}
				className="col-start-1 col-end-3"
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
						className="col-start-1 col-end-2"
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
			<div className="col-start-2 col-end-3">
				<Switch.Group>
					<Switch.Description>Check previous question</Switch.Description>
					<Switch
						name="terms-of-service"
						defaultChecked={true}
						onChange={handleCheckChange}
					>
						{({ checked }) => (
							<button
								className={`${
									checked ? "bg-blue-600" : "bg-gray-200"
								} relative inline-flex h-6 w-11 items-center rounded-full`}
							>
								<span className="sr-only">Enable notifications</span>
								<span
									className={`${
										checked ? "translate-x-6" : "translate-x-1"
									} inline-block h-4 w-4 transform rounded-full bg-white transition`}
								/>
							</button>
						)}
					</Switch>
				</Switch.Group>
			</div>
			<FieldInput
				label="Duration *"
				id="duration"
				inputType="number"
				className="col-start-1 col-end-2"
				register={register}
				errorMessage={errors.duration?.message}
			/>
			<FieldInput
				label="Questions per page *"
				id="questionsPerPage"
				inputType="number"
				className="col-start-2 col-end-3"
				register={register}
				errorMessage={errors.questionsPerPage?.message}
			/>

			<QuestionList control={control} register={register} errors={errors} />
			<span className="error error-message">{errors.questions?.message}</span>

			<button type="submit">Submit</button>
		</form>
	);
}
