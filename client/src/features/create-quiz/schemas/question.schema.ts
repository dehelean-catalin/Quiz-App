import * as yup from "yup";

const answerSchema = yup
	.array(
		yup.object({
			answer: yup.string().trim().required("Answer is required"),
			isValid: yup.boolean().required(),
		})
	)
	.min(2, "At least two answers are required")
	.max(8, "At most 8 answers are allowed")
	.test("atLeastOneTrue", "At least one valid answer is required", (value) =>
		value?.some((obj) => obj.isValid === true)
	)
	.required();

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
