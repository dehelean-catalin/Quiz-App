import { useQuestionStore } from "../store/questionStore";

export function useAttemptDetails(page: number) {
	const question = useQuestionStore((state) => state.question);

	const nextPage = page + 1;
	const numberOfQuestions = question.numberOfQuestions as number;
	const questionsPerPage = question.questionsPerPage as number;

	const isOnTheLastPage = nextPage * questionsPerPage >= numberOfQuestions;

	const currentTotalQuestions = nextPage * questionsPerPage;

	const numberOfCompletedQuestions =
		currentTotalQuestions > numberOfQuestions
			? numberOfQuestions
			: currentTotalQuestions;

	return {
		title: question.title,
		isOnTheLastPage,
		numberOfCompletedQuestions,
		numberOfQuestions,
		nextPage,
	};
}
