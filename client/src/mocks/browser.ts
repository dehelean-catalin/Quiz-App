import { setupWorker } from "msw/browser";
import { getAllQuizzes } from "./api/quizzes.js";

export const worker = setupWorker(getAllQuizzes);
