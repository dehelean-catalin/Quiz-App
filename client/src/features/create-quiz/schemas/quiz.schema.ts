import * as yup from "yup";

const POSITIVE_NUMBER_MESSAGE = "Input must be a positive number";
const GENERIC_TYPE_NUMBER_MESSAGE = "Input must be a number";

const answerSchema = yup
	.array(
		yup.object({
			answer: yup.string().trim().required("Answer is required"),
			isValid: yup.boolean().required(),
		})
	)
	.required();

const questionSchema = yup
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

export const quizSchema = yup
	.object({
		title: yup.string().trim().required("Title is required"),
		description: yup.string().trim().required("Description is required"),
		duration: yup
			.number()
			.typeError(GENERIC_TYPE_NUMBER_MESSAGE)
			.positive(POSITIVE_NUMBER_MESSAGE)
			.required(),
		difficulty: yup.string().required(),
		questionsPerPage: yup
			.number()
			.typeError(GENERIC_TYPE_NUMBER_MESSAGE)
			.positive(POSITIVE_NUMBER_MESSAGE)
			.required(),
		checkPrevious: yup.boolean().required(),
		questions: yup.array(questionSchema),
		categories: yup.array(yup.string()).optional(),
		subCategories: yup.array(yup.string()).optional(),
	})
	.required();

export type QuizFormData = yup.InferType<typeof quizSchema>;
export type QuestionFormData = yup.InferType<typeof questionSchema>;
