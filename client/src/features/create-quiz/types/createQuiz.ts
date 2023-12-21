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
	checkPrevious: boolean;
	questions: CreateQuestion[];
	categories: string[];
	subCategories: string[];
};
