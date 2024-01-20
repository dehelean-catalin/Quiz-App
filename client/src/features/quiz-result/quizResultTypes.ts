export type QuizResult = {
	id: string;
	title: string;
	startTime: string;
	totalScore: number;
	completedAt: string;
	isCompleted: boolean;
	timeDeltaInSeconds: number;
	totalPoints: number;
	scorePercentage: number;
	questions: QuestionResult[];
};

export type QuestionResult = {
	id: string;
	title: string;
	score: number;
	points: number;
	yourAnswers: string[];
	answers: Answer[];
};

export type Answer = {
	id: string;
	isValid: boolean;
	answer: string;
};
