import { setupWorker } from "msw/browser";
import { getQuestionById, getQuestionIDs } from "./api/questions.js";
import { getAllQuizzes, getQuizByID } from "./api/quizzes.js";

export const worker = setupWorker(
	getAllQuizzes,
	getQuizByID,
	getQuestionIDs,
	getQuestionById
);
