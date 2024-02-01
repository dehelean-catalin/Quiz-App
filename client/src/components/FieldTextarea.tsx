import clsx from "clsx";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { QuizFormData } from "../features/create-quiz/schemas/quiz.schema";

interface Props<T extends FieldValues = QuizFormData>
	extends DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	label: string;
	id: Path<T>;
	register: UseFormRegister<T>;
	errorMessage?: string;
	className: string;
}

export function FieldTextarea<T extends FieldValues = QuizFormData>({
	label,
	id,
	errorMessage = "",
	cols = 30,
	rows = 6,
	register,
	className,
	...rest
}: Props<T>) {
	const errorId = `err-${id}`;

	return (
		<div className={clsx({ [className]: !!className })}>
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
