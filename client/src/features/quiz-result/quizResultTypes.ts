export type QuizResult = {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	totalScore: number;
	questions: QuestionResult[];
};

export type QuestionResult = {
	id: string;
	title: string;
	score: number;
	yourAnswers: string[];
	answers: Answer[];
};

export type Answer = {
	id: string;
	isValid: boolean;
	answer: string;
};
