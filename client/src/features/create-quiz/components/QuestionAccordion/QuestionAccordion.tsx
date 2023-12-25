import { GoCheckCircleFill, GoPencil, GoTrash } from "react-icons/go";
import { QuestionFormData } from "../../schemas/quiz.schema";
import styles from "./QuestionAccordion.module.css";

type Props = {
	field: QuestionFormData;
	onRemove: () => void;
	index: number;
};

export default function QuestionAccordion({
	field,
	onRemove: handleRemove,
	index,
}: Props) {
	return (
		<details className={styles.details} open>
			<summary>
				<button onClick={handleRemove}>
					<GoTrash size={16} />
				</button>
				<button onClick={handleRemove} disabled>
					<GoPencil size={16} />
				</button>
				<span>
					{index + 1}. {field.title}
				</span>
				<span className={styles.points}> ({field.points} points)</span>
			</summary>
			{field.answers?.map((answer, key) => (
				<div
					className={`${styles.answer} ${answer.isValid ? styles.isValid : ""}`}
					key={key}
				>
					{answer.answer}
					{answer.isValid ? <GoCheckCircleFill size={20} /> : ""}
				</div>
			))}
		</details>
	);
}
