import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { GoPlus, GoTrash } from "react-icons/go";
import { IconButton } from "../../../../components";
import { FieldInput } from "../../../../components/FieldInput";
import { FieldTextarea } from "../../../../components/FieldTextarea";
import { useDialog } from "../../../../shared/hooks";
import { QuestionFormData, questionSchema } from "../../schemas";
import styles from "./QuestionActionDialog.module.css";

type Props = {
	concat: (data: QuestionFormData) => void;
};

const DEFAULT_VALUES: QuestionFormData = {
	title: "",
	points: 1,
	answers: [
		{ answer: "True", isValid: true },
		{ answer: "False", isValid: false },
	],
};

export default function QuestionActionDialog({ concat }: Props) {
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

	const { ref, isOpen, open, close } = useDialog<QuestionFormData>(() =>
		reset(DEFAULT_VALUES, {
			keepIsSubmitted: false,
			keepTouched: false,
			keepErrors: false,
		})
	);

	function onSubmit(data: QuestionFormData) {
		concat(data);
		close();
	}

	return (
		<>
			<IconButton icon={<GoPlus size={20} />} text="Create" onClick={open} />
			<dialog ref={ref} className={styles.dialog} open={isOpen}>
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
						{errors.answers?.root && errors.answers.root.message}
						{errors.answers?.type == "min" && errors.answers.message}
					</span>
				</div>

				<div className={styles.footer}>
					<IconButton
						disabled={fields.length > 7}
						text="Add answer"
						icon={<GoPlus size={18} />}
						onClick={() => {
							append({ answer: "", isValid: false });
						}}
					/>

					<IconButton
						text="Close"
						severity="submit"
						className="m-l-auto"
						onClick={close}
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
