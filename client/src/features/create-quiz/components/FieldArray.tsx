import {
	Control,
	FieldErrors,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import { QuizFormData } from "../schemas/quiz.schema";
import { FieldInput } from "./FieldInput";

type Props = {
	register: UseFormRegister<QuizFormData>;
	control: Control<QuizFormData>;
	errors: FieldErrors<QuizFormData>;
};

export function FieldArray({ register, control, errors }: Props) {
	const { fields, remove } = useFieldArray({
		control,
		name: "questions",
	});

	return (
		<>
			{fields.map((field, index) => (
				<details key={field.id}>
					<summary>
						{index + 1}. {field.title}
						<button onClick={() => remove()}>Remove</button>
					</summary>
					<div>
						<FieldInput
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
						/>
					</div>
				</details>
			))}
		</>
	);
}
