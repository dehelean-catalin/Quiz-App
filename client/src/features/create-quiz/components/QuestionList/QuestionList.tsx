import {
	Control,
	FieldErrors,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import { QuizFormData } from "../../schemas/quiz.schema";
import QuestionAccordion from "../QuestionAccordion/QuestionAccordion";
import QuestionActionDialog from "../QuestionActionDialog/QuestionActionDialog";
import styles from "./QuestionList.module.css";

type Props = {
	control: Control<QuizFormData>;
	register: UseFormRegister<QuizFormData>;
	errors: FieldErrors<QuizFormData>;
};

export default function QuestionList({ control }: Props) {
	const { fields, remove, append } = useFieldArray({
		control,
		name: "questions",
	});

	return (
		<article className={styles.container}>
			<header>
				Questions
				{!!fields.length && <QuestionActionDialog concat={append} />}
			</header>
			<section>
				{fields.length ? (
					fields.map((field, index) => (
						<QuestionAccordion
							key={field.id}
							field={field}
							onRemove={() => remove(index)}
						/>
					))
				) : (
					<div className={styles.card}>
						<p>Create your first quiz</p>
						<QuestionActionDialog concat={append} />
					</div>
				)}
			</section>
		</article>
	);
}
