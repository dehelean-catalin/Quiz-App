import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { QuizFormData } from "../schemas/quiz.schema";

type Props = {
	register: UseFormRegister<QuizFormData>;
	control: Control<QuizFormData>;
};

export function FieldArray({ register, control }: Props) {
	const { fields, remove } = useFieldArray({
		control,
		name: "questions",
	});

	return (
		<>
			{fields.map((field, index) => (
				<details>
					<summary>
						{index + 1}. {field.title}
						<button onClick={() => remove()}>Remove</button>
					</summary>
					<div key={field.id}>
						<input {...register(`questions.${index}.title`)} />
						<input type="number" {...register(`questions.${index}.points`)} />
					</div>
				</details>
			))}
		</>
	);
}
