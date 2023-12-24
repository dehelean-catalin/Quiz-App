import { QuestionFormData } from "../../schemas/quiz.schema";

type Props = {
	field: QuestionFormData;
	onRemove: () => void;
};

export default function QuestionAccordion({
	field,
	onRemove: handleRemove,
}: Props) {
	return (
		<details>
			<summary>
				{field.title} {field.points}
				<button onClick={handleRemove}>Remove</button>
			</summary>
			{field.answers?.map((answer, key) => (
				<div key={key}>
					{answer.answer}
					{answer.isValid}
				</div>
			))}
		</details>
	);
}
