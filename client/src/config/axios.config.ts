import axios from "axios";

export const ROUTES = {
	QUIZ: "quizzes",
	QUESTIONS: "questions",
};
export const BASE_URL = "http://localhost:8080/";

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
});
