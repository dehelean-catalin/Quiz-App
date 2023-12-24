import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { QuestionFormData, questionSchema } from "../../schemas";
import styles from "./QuestionActionDialog.module.css";

type Props = {
	concat: (data: QuestionFormData) => void;
};

const DEFAULT_VALUES = { title: "", points: 1, answers: [] };

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
			<button type="button" onClick={handleOpen}>
				Add
			</button>
			<dialog className={styles.container} open={isOpen}>
				<label htmlFor="title">Quetion title</label>
				<input id="title" type="text" {...register("title")} />
				<span>{errors.title?.message}</span>
				<label htmlFor="points">Points</label>
				<input id="points" type="number" {...register("points")} />
				<span>{errors.points?.message}</span>
				<span>
					{errors.answers?.root?.type == "min" && errors.answers.root.message}
					{errors.answers?.type == "min" && errors.answers.message}
				</span>
				<button
					type="button"
					onClick={() => append({ answer: "", isValid: false })}
				>
					Add
				</button>

				{fields.map((field, index) => (
					<div key={field.id}>
						<input type="checkbox" {...register(`answers.${index}.isValid`)} />
						<input type="text" {...register(`answers.${index}.answer`)} />
						<span>
							{errors.answers && errors.answers[index]?.answer?.message}
						</span>
						<button type="button" onClick={() => remove(index)}>
							Remove
						</button>
					</div>
				))}

				<button type="button" onClick={handleClose}>
					Close
				</button>
				<button type="button" onClick={handleSubmit(onSubmit)}>
					Submit
				</button>
			</dialog>
		</>
	);
}
