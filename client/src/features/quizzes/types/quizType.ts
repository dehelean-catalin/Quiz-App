export type QuizDifficulty = "easy" | "intermediate" | "pro";

export type QuizCategory =
	| "Web Development"
	| "Programming Languages"
	| "Backend Development";

export type QuizSubCategory =
	| "HTML & CSS"
	| "JavaScript"
	| "TypeScript"
	| "Java"
	| "React js"
	| "Node js";

export type Quiz = {
	id: string;
	title: string;
	description: string;
	difficulty: QuizDifficulty;
	duration: number;
	numberOfQuestions: number;
	categories: QuizCategory[];
	subCategories: QuizSubCategory[];
};
