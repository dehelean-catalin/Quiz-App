export type Question = {
	id: string;
	title: string;
	options: QuestionOption[];
};

type QuestionOption = {
	id: string;
	option: string;
};
