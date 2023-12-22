import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { QuizFormData } from "../schemas/quiz.schema";

interface Props
	extends DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	label: string;
	id: keyof QuizFormData;
	register: UseFormRegister<QuizFormData>;
	errorMessage?: string;
}

export function FieldTextarea({
	label,
	id,
	errorMessage = "",
	cols = 30,
	rows = 10,
	register,
	...rest
}: Props) {
	const errorId = `err-${id}`;

	return (
		<div className="flex col">
			<label htmlFor={id} className={errorMessage ? "error" : ""}>
				{label}
			</label>
			<textarea
				id={id}
				cols={cols}
				rows={rows}
				{...register(id)}
				{...rest}
				aria-invalid={errorMessage ? "true" : "false"}
				aria-errormessage={errorId}
			></textarea>
			<span id={errorId} className="error error-message">
				{errorMessage}
			</span>
		</div>
	);
}
