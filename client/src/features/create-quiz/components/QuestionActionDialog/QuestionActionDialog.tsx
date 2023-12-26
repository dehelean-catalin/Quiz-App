import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { GoPlus, GoTrash } from "react-icons/go";
import { IconButton } from "../../../../components";
import { QuestionFormData, questionSchema } from "../../schemas";
import { FieldInput } from "../FieldInput";
import { FieldTextarea } from "../FieldTextarea";
import styles from "./QuestionActionDialog.module.css";

type Props = {
	concat: (data: QuestionFormData) => void;
};

const DEFAULT_VALUES: QuestionFormData = {
	title: "",
	points: 1,
	answers: [
		{ answer: "", isValid: false },
		{ answer: "", isValid: false },
	],
};

export default function QuestionActionDialog({ concat }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<QuestionFormData>({
		resolver: yupResolver(questionSchema),
		defaultValues: DEFAULT_VALUES,
	});

	const { fields, remove, append } = useFieldArray({
		control,
		name: "answers",
	});

	function handleOpen() {
		setIsOpen(true);
		document.querySelector("dialog")?.showModal();
	}

	function handleClose() {
		reset(DEFAULT_VALUES, {
			keepIsSubmitted: false,
			keepTouched: false,
		});
		setIsOpen(false);
		document.querySelector("dialog")?.close();
	}

	function onSubmit(data: QuestionFormData) {
		concat(data);
		handleClose();
	}

	return (
		<>
			<IconButton
				icon={<GoPlus size={20} />}
				text="Create"
				onClick={handleOpen}
			/>
			<dialog className={styles.dialog} open={isOpen}>
				<div className={styles.container}>
					<FieldTextarea<QuestionFormData>
						label="Title"
						id="title"
						register={register}
						placeholder="Enter question title..."
						rows={4}
						errorMessage={errors.title?.message}
					/>
					<FieldInput<QuestionFormData>
						label="Points"
						id="points"
						inputType="number"
						register={register}
						placeholder="Enter number of points"
						errorMessage={errors.points?.message}
					/>
					{fields.map((field, index) => (
						<div className={styles.field} key={field.id}>
							<input
								className={styles.checkbox}
								type="checkbox"
								{...register(`answers.${index}.isValid`)}
								placeholder="Enter answer"
							/>
							<FieldTextarea
								label=""
								id={`answers.${index}.answer`}
								register={register}
								placeholder="Enter new answer"
								rows={2}
								errorMessage={
									errors.answers && errors.answers[index]?.answer?.message
								}
							/>

							<IconButton
								icon={<GoTrash size={16} />}
								onClick={() => remove(index)}
								severity="info"
							/>
						</div>
					))}
					<span className="error error-message">
						{errors.answers?.root?.type == "min" && errors.answers.root.message}
						{errors.answers?.type == "min" && errors.answers.message}
					</span>
				</div>

				<div className={styles.footer}>
					<IconButton
						disabled={fields.length > 8}
						text="Add answer"
						icon={<GoPlus size={18} />}
						onClick={() => append({ answer: "", isValid: false })}
					/>

					<IconButton
						text="Close"
						severity="submit"
						className="m-l-auto"
						onClick={handleClose}
					/>
					<IconButton
						text="Submit"
						severity="submit"
						onClick={handleSubmit(onSubmit)}
					/>
				</div>
			</dialog>
		</>
	);
}
