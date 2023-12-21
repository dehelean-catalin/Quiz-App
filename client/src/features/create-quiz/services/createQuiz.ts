import { axiosInstance } from "../../../config/axios.config";
import { CreateQuiz } from "../types/createQuiz";

export async function createQuiz(data: CreateQuiz) {
	try {
		const response = await axiosInstance.post("/quiz", data);
		return response;
	} catch (error) {
		return error;
	}
}
