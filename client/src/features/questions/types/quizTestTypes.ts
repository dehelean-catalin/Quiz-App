export type Question = {
	id: string;
	title: string;
	answers: QuestionOption[];
	points: number;
};

type QuestionOption = {
	id: string;
	option: string;
};
