export type CreateQuestion = {
	title: string;
	answers: string[];
	validAnswers: string[];
	points: number;
};

export type CreateQuiz = {
	title: string;
	description: string;
	difficulty: string;
	duration: number;
	questionsPerPage: number;
	allowBack: boolean;
	questions: CreateQuestion[];
};
