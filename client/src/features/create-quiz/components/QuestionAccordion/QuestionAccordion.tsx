import clsx from "clsx";
import { GoCheckCircleFill, GoPencil, GoTrash } from "react-icons/go";
import { IconButton } from "../../../../components";
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
				<IconButton
					className={styles.btns}
					onClick={handleRemove}
					icon={<GoTrash size={16} />}
					severity="info"
				/>
				<IconButton
					className={styles.btns}
					onClick={handleRemove}
					icon={<GoPencil size={16} />}
					severity="info"
					disabled={true}
				/>

				<span>
					{index + 1}. {field.title}
				</span>
				<span className={styles.points}> ({field.points} points)</span>
			</summary>

			{field.answers?.map((answer, key) => (
				<div
					key={key}
					className={clsx("answer-card", { [styles.isValid]: answer.isValid })}
				>
					<span>{answer.answer}</span>
					{answer.isValid ? <GoCheckCircleFill size={20} /> : ""}
				</div>
			))}
		</details>
	);
}
