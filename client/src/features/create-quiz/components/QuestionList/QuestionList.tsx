import {
	Control,
	FieldErrors,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import { QuizFormData } from "../../schemas/quiz.schema";
import QuestionAccordion from "./QuestionAccordion";

type Props = {
	control: Control<QuizFormData>;
	register: UseFormRegister<QuizFormData>;
	errors: FieldErrors<QuizFormData>;
};

export default function QuestionList({ control, register, errors }: Props) {
	const { fields, remove, append } = useFieldArray({
		control,
		name: "questions",
	});

	return (
		<div>
			Questions:
			{/* <QuestionActionDialog
				onSubmit={() => append({})}
				form={
					<>
						<input type="text" name="" id="" />
						<input type="number" name="" id="" />
					</>
				}
			/> */}
			{fields.map((field) => (
				<QuestionAccordion
					key={field.id}
					field={field}
					onRemove={() => remove()}
				/>
			))}
		</div>
	);
}
