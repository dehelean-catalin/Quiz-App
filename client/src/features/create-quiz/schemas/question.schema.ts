import * as yup from "yup";

function isAtLeastOneAnswerValid(
	value: { isValid: boolean; answer: string }[]
) {
	return value?.some((obj) => obj.isValid === true);
}

const answerSchema = yup
	.array(
		yup.object().shape({
			isValid: yup.boolean().required(),
			answer: yup.string().trim().required("Answer is required"),
		})
	)
	.min(2, "At least two answers are required")
	.max(8, "At most 8 answers are allowed")
	.required()
	.test(
		"atLeastOneTrue",
		"At least one valid answer is required",
		isAtLeastOneAnswerValid
	);

export const questionSchema = yup
	.object({
		title: yup.string().trim().required("Title is required"),
		points: yup
			.number()
			.typeError("Points must be a number")
			.positive("Points must be a positive value")
			.required("Points are required"),
		answers: answerSchema,
	})
	.required();
