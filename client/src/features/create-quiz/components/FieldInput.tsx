import {
	DetailedHTMLProps,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	ReactNode,
} from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { QuizFormData } from "../schemas";

interface Props<T extends FieldValues = QuizFormData>
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label: string;
	id: Path<T>;
	register?: UseFormRegister<T>;
	inputType?: HTMLInputTypeAttribute;
	errorMessage?: string;
	before?: ReactNode;
	after?: ReactNode;
}

export function FieldInput<T extends FieldValues = QuizFormData>({
	errorMessage = "",
	label,
	id,
	inputType = "text",
	register,
	className = "flex col",
	...rest
}: Props<T>) {
	const registerFormActions = register ? register(id) : "";
	const errorId = `err-${id}`;

	return (
		<div className={className}>
			<label htmlFor={id} className={errorMessage ? "error" : ""}>
				{label}
			</label>
			<input
				type={inputType}
				id={id}
				{...rest}
				{...registerFormActions}
				aria-invalid={errorMessage ? "true" : "false"}
				aria-errormessage={errorId}
			/>
			<span id={errorId} className="error error-message">
				{errorMessage}
			</span>
		</div>
	);
}
