import { FieldValues, UseFormRegister } from "react-hook-form";
import { IQuestion } from "../../../shared";
import styles from "./QuestionCard.module.css";

type Props = {
	value: IQuestion;
	register: UseFormRegister<FieldValues>;
	errorMessage: string;
};

export function QuestionCard({ value, register, errorMessage }: Props) {
	const errorId = `err-${value.title}`;
	return (
		<div className={`card ${styles.container}`}>
			<h1>{value.title}</h1>
			<span>{value.points}</span>

			{value.answers.map((answer) => {
				const id = `${value.id}/${answer.id}`;

				return (
					<label
						htmlFor={id}
						key={answer.id}
						className="block tag"
						aria-invalid={errorMessage ? "true" : "false"}
						aria-errormessage={errorId}
					>
						<input
							id={id}
							type="checkbox"
							{...register(value.id, { required: "Required*" })}
							value={answer.id}
						/>
						{answer.answer}
					</label>
				);
			})}
			<span className="error error-message">{errorMessage}</span>
		</div>
	);
}
