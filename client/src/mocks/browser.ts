import { setupWorker } from "msw/browser";
import { handlers as questionHandlers } from "./api/questions.js";
import { getAllQuizzes, getQuizByID } from "./api/quizzes.js";

export const worker = setupWorker(
	getAllQuizzes,
	getQuizByID,
	...questionHandlers
);
