import * as yup from "yup";

const POSITIVE_NUMBER_MESSAGE = "Input must be a positive number";

const questionSchema = yup
	.object({
		title: yup.string().trim().required("Title is required"),
		points: yup
			.number()
			.positive("Points must be a positive value")
			.required("Points are required"),
		answers: yup.array(yup.string()).optional(),
		validAnswers: yup.array(yup.string()).optional(),
	})
	.required();

export const quizSchema = yup
	.object({
		title: yup.string().trim().required("Title is required"),
		description: yup.string().trim().required("Description is required"),
		duration: yup.number().positive(POSITIVE_NUMBER_MESSAGE).required(),
		difficulty: yup.string().required(),
		questionsPerPage: yup.number().positive(POSITIVE_NUMBER_MESSAGE).required(),
		checkPrevious: yup.boolean().required(),
		questions: yup.array(questionSchema),
		categories: yup.array(yup.string()).optional(),
		subCategories: yup.array(yup.string()).optional(),
	})
	.required();

export type QuizFormData = yup.InferType<typeof quizSchema>;
export type QuestionFormData = yup.InferType<typeof questionSchema>;
