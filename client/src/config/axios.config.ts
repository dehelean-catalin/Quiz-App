import axios from "axios";

export const ROUTES = {
	LANDING: "",
	QUIZ: "quizzes",
	QUESTIONS: "questions",
};
export const BASE_URL = "http://localhost:8090/";

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
});
