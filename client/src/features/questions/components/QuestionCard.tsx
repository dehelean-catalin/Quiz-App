import { IQuestion } from "../../../shared";
import styles from "./QuestionCard.module.css";

type Props = { value: IQuestion };

export function QuestionCard({ value }: Props) {
	return (
		<div className={`card ${styles.container}`}>
			<h1>{value.title}</h1>
			<span>{value.points}</span>
			{value.answers.map((answer) => (
				<label
					htmlFor={`option-${answer.id}`}
					key={answer.id}
					className="block tag"
				>
					<input
						id={`option-${answer.id}`}
						type="checkbox"
						// onClick={() => handleClick(id)}
						// checked={selectedOptions.includes(id)}
					/>
					{answer.answer}
				</label>
			))}
		</div>
	);
}
