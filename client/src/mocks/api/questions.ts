import { HttpResponse, http } from "msw";
import { BASE_URL, ROUTES } from "../../config/axios.config";
import { QUESTIONS } from "../data/questions";

export const getQuestionIDs = http.get(`${BASE_URL}${ROUTES.TEST}`, () => {
	const ids = QUESTIONS.map((question) => question.id);

	return HttpResponse.json(ids);
});

export const getQuestionById = http.get(
	`${BASE_URL}${ROUTES.TEST}/:id`,
	({ params }) => {
		const question = QUESTIONS.find((question) => question.id === params?.id);

		return HttpResponse.json(question);
	}
);
