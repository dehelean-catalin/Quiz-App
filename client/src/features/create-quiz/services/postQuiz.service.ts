import { axiosInstance } from "../../../config/axios.config";
import { QuizFormData } from "../schemas/quiz.schema";

export async function postQuiz(data: QuizFormData) {
	try {
		const response = await axiosInstance.post<string>("/quizzes", data);
		return response;
	} catch (error) {
		return error;
	}
}
