import { axiosInstance } from "../../../config/axios.config";
import { QuizFormData } from "../schemas/quiz.schema";

export function postQuiz(data: QuizFormData) {
	return axiosInstance.post<string>("/quizzes", data).then((res) => res.data);
}
