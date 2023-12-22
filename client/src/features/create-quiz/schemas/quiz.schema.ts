import * as yup from "yup";

const questionSchema = yup.object({
	title: yup.string().required(),
	points: yup.number().required(),
	answers: yup.array(yup.string()).required(),
	validAnswers: yup.array(yup.string()).required(),
});

export const quizSchema = yup
	.object({
		title: yup.string().required(),
		description: yup.string().required(),
		duration: yup.number().positive().required(),
		difficulty: yup.string().required(),
		questionsPerPage: yup.number().positive().required(),
		checkPrevious: yup.boolean().required(),
		questions: yup.array(questionSchema).optional(),
		categories: yup.array(yup.string()).optional(),
		subCategories: yup.array(yup.string()).optional(),
	})
	.required();

export type QuizFormData = yup.InferType<typeof quizSchema>;
export type QuestionFormData = yup.InferType<typeof questionSchema>;
