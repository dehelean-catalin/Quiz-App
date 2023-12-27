export type IQuiz = {
	id: string;
	title: string;
	description: string;
	duration: number;
	difficulty: string;
	questionsPerPage: number;
	checkPrevious: boolean;
	questions: IQuestion[];
	categories?: (string | undefined)[] | undefined;
	subCategories?: (string | undefined)[] | undefined;
};

export type IQuestion = {
	id: string;
	answers: Answer[];
	title: string;
	points: number;
};

export type Answer = {
	id: string;
	answer: string;
};
