import {
	DetailedHTMLProps,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
} from "react";
import { UseFormRegister } from "react-hook-form";
import { QuizFormData } from "../schemas/quiz.schema";

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label: string;
	id: keyof QuizFormData;
	register?: UseFormRegister<QuizFormData>;
	inputType?: HTMLInputTypeAttribute;
	errorMessage?: string;
}

export function FieldInput({
	errorMessage = "",
	label,
	id,
	inputType = "text",
	register,
	...rest
}: Props) {
	const test = register ? register(id) : "";
	const errorId = `err-${id}`;

	return (
		<div className="flex col">
			<label htmlFor={id} className={errorMessage ? "error" : ""}>
				{label}
			</label>
			<input
				type={inputType}
				id={id}
				{...rest}
				{...test}
				aria-invalid={errorMessage ? "true" : "false"}
				aria-errormessage={errorId}
			/>
			<span id={errorId} className="error error-message">
				{errorMessage}
			</span>
		</div>
	);
}
