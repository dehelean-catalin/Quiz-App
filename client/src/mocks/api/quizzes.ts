import { HttpResponse, http } from "msw";
import { QUIZZES } from "../data/quizzes";

export const getAllQuizzes = http.get("http://localhost:8080/quizzes", () => {
	return HttpResponse.json(QUIZZES);
});
