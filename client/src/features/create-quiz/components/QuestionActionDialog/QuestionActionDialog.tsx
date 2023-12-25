import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { QuestionFormData, questionSchema } from "../../schemas";
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
			<button className={styles.iconBtn} type="button" onClick={handleOpen}>
				<GoPlus size={20} />
				<span>Create</span>
			</button>
			<dialog className={styles.dialog} open={isOpen}>
				<div className={styles.container}>
					<label htmlFor="title">Title</label>
					<textarea
						id="title"
						{...register("title")}
						placeholder="Enter question title..."
					/>
					<span>{errors.title?.message}</span>

					<label htmlFor="points">Points</label>
					<input
						id="points"
						type="number"
						{...register("points")}
						placeholder="Enter number of points"
					/>
					<span>{errors.points?.message}</span>
				</div>
				<span>
					{errors.answers?.root?.type == "min" && errors.answers.root.message}
					{errors.answers?.type == "min" && errors.answers.message}
				</span>

				{fields.map((field, index) => (
					<div key={field.id}>
						<input
							type="checkbox"
							{...register(`answers.${index}.isValid`)}
							placeholder="Enter answer"
						/>
						<input
							type="text"
							{...register(`answers.${index}.answer`)}
							placeholder="Enter answer"
						/>
						<span>
							{errors.answers && errors.answers[index]?.answer?.message}
						</span>
						<button type="button" onClick={() => remove(index)}>
							Remove
						</button>
					</div>
				))}
				<button
					type="button"
					onClick={() => append({ answer: "", isValid: false })}
				>
					Add
				</button>
				<div>
					<button type="button" onClick={handleClose}>
						Close
					</button>
					<button type="button" onClick={handleSubmit(onSubmit)}>
						Submit
					</button>
				</div>
			</dialog>
		</>
	);
}
