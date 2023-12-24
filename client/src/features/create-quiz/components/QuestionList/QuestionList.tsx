import {
	Control,
	FieldErrors,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import { QuizFormData } from "../../schemas/quiz.schema";
import QuestionActionDialog from "../QuestionActionDialog/QuestionActionDialog";
import QuestionAccordion from "./QuestionAccordion";

type Props = {
	control: Control<QuizFormData>;
	register: UseFormRegister<QuizFormData>;
	errors: FieldErrors<QuizFormData>;
};

export default function QuestionList({ control }: Props) {
	const { fields, remove, append } = useFieldArray({
		control,
		name: "questions",
	});

	return (
		<div>
			Questions:
			<QuestionActionDialog concat={append} />
			{fields.map((field, index) => (
				<QuestionAccordion
					key={field.id}
					field={field}
					onRemove={() => remove(index)}
				/>
			))}
		</div>
	);
}
