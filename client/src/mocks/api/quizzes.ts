import { HttpResponse, http } from "msw";
import { BASE_URL } from "../../config/axios.config";
import { ROUTES } from "../../config/routes";
import { QUIZZES } from "../data/quizzes";

export const getAllQuizzes = http.get(`${BASE_URL}${ROUTES.QUIZ}`, () => {
	return HttpResponse.json(QUIZZES);
});

export const getQuizByID = http.get(
	`${BASE_URL}${ROUTES.QUIZ}/:id`,
	({ params }) => {
		const { id } = params;

		if (!id) {
			return new HttpResponse("Something went wrong!", { status: 404 });
		}

		const quiz = QUIZZES.find((quiz) => quiz.id === id);

		if (!quiz) {
			return new HttpResponse("Something went wrong!", { status: 404 });
		}

		return HttpResponse.json(quiz);
	}
);
