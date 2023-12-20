import { HttpResponse, http } from "msw";
import { BASE_URL, ROUTES } from "../../config/axios.config";
import { QUESTIONS } from "../data/questions";

const getQuestionIDs = http.get(`${BASE_URL}${ROUTES.QUESTIONS}`, () => {
	const ids = QUESTIONS.map((question) => question.id);

	return HttpResponse.json(ids);
});

const getQuestionById = http.get(
	`${BASE_URL}${ROUTES.QUESTIONS}/:id`,
	({ params }) => {
		const question = QUESTIONS.find((question) => question.id === params?.id);

		return HttpResponse.json(question);
	}
);

const postQuestionResult = http.post(
	`${BASE_URL}${ROUTES.QUESTIONS}/:id`,
	(haha) => {
		console.log(haha);

		return HttpResponse.json(haha);
	}
);

export const handlers = [getQuestionById, getQuestionIDs, postQuestionResult];
