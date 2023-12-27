export enum Difficulty {
	"Easy",
	"Medium",
	"Hard",
}

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

export type QuizSummary = {
	id: string;
	title: string;
	description: string;
	difficulty: Difficulty;
	duration: number;
	numberOfQuestions: number;
	categories: QuizCategory[];
	subCategories: QuizSubCategory[];
};
