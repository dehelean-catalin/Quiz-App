import { axiosInstance } from "../../../config/axios.config";
import { CreateQuiz } from "../types/createQuiz";

export async function postQuiz(data: CreateQuiz) {
	try {
		const response = await axiosInstance.post<string>("/quizzes", data);
		return response;
	} catch (error) {
		return error;
	}
}
