import { GoCheckCircleFill, GoPencil, GoTrash } from "react-icons/go";
import { QuestionFormData } from "../../schemas/quiz.schema";
import styles from "./QuestionAccordion.module.css";

type Props = {
	field: QuestionFormData;
	onRemove: () => void;
};

export default function QuestionAccordion({
	field,
	onRemove: handleRemove,
}: Props) {
	return (
		<details className={styles.details} open>
			<summary>
				{field.points}. {field.title}
				<button onClick={handleRemove}>
					<GoTrash size={16} />
				</button>
				<button onClick={handleRemove} disabled>
					<GoPencil size={16} />
				</button>
			</summary>
			<ol type="A">
				{field.answers?.map((answer, key) => (
					<li
						className={`${styles.answer} ${
							answer.isValid ? styles.isValid : ""
						}`}
						key={key}
					>
						{answer.answer}
						{answer.isValid ? <GoCheckCircleFill size={20} /> : ""}
					</li>
				))}
			</ol>
		</details>
	);
}
