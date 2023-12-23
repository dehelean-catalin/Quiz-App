import {
	Control,
	FieldErrors,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import { QuizFormData } from "../schemas/quiz.schema";

type Props = {
	register: UseFormRegister<QuizFormData>;
	control: Control<QuizFormData>;
	errors: FieldErrors<QuizFormData>;
};

export function FieldArray({ control }: Props) {
	const { fields, remove } = useFieldArray({
		control,
		name: "questions",
	});

	return (
		<>
			{fields.map((field, index) => (
				<details key={field.id}>
					<summary>
						{index + 1}. {field.title} {field.points}
						<button onClick={() => remove()}>Remove</button>
						<button onClick={() => remove()}>Edit</button>
					</summary>
					<div className="flex">
						{field.answers?.map((answer) => (
							<>
								{answer.answer}
								{answer.isValid}
							</>
						))}
						{/* <FieldInput
							label={field.title}
							id={`questions.${index}.title`}
							errorMessage={
								errors?.questions ? errors.questions[index]?.title?.message : ""
							}
							register={register}
						/>
						<FieldInput
							label={"Points"}
							inputType="number"
							id={`questions.${index}.points`}
							errorMessage={
								errors?.questions
									? errors.questions[index]?.points?.message
									: ""
							}
							register={register}
						/> */}
					</div>
				</details>
			))}
		</>
	);
}
