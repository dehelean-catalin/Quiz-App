import * as yup from "yup";
import { questionSchema } from "./question.schema";

const POSITIVE_NUMBER_MESSAGE = "Input must be a positive number";
const GENERIC_TYPE_NUMBER_MESSAGE = "Input must be a number";

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
		allowBack: yup.boolean().required(),
		questions: yup
			.array()
			.test(
				"questionsLength",
				"At least one question is required",
				(value) => value?.length !== 0
			)
			.required(),
		categories: yup.array(yup.string()).optional(),
		subCategories: yup.array(yup.string()).optional(),
	})
	.required();

export type QuizFormData = yup.InferType<typeof quizSchema>;
export type QuestionFormData = yup.InferType<typeof questionSchema>;
